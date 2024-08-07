import client from "../../../tina/__generated__/client";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import React from "react";
import BlogPostPreviewRenderer, {
  BlogPostPreview,
} from "@/components/Blog/Post/Preview";
import Link from "next/link";
import { promises as fs } from "fs";
import generateRSSFeed from "@/scripts/RSS";
import { makeUndefinedNull } from "@/scripts/Utils/TypeHelp/NullUndefined";
import { CARD_VARIANTS } from "@/animations/card";
import { motion } from "framer-motion";

type BlogProps = {
  blogPostPreviews: BlogPostPreview[];
  appProps: AppProps;
};

const pageName = `Blog`;

export default function BlogPage(props: BlogProps) {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={props.appProps}
      description="Home for Awesome Arcade's blog!"
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools, Blog, Awesome Arcade blog, Blog post, Awesome Arcade blog post, Blog home, Awesome Arcade blog home"
    >
      <h1>Welcome to Awesome Arcade{"'"}s blog!</h1>
      <p>
        Here I write about many things related to MakeCode Arcade, including
        games, extensions, tools, tips and tricks, and experiences developing in
        MakeCode Arcade.
      </p>
      <p>
        I hope you find these posts useful and interesting. If you have any
        questions, suggestions, or feedback, feel free to reach out to me on{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Discussions
        </a>{" "}
        or the{" "}
        <a
          href="https://forum.makecode.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MakeCode forums
        </a>
        .
      </p>
      <p>
        You can also subscribe to this blog with a{" "}
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          RSS feed reader
        </a>
        !
      </p>
      <h2>Latest blog posts</h2>
      {
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 px-1 pt-1 pb-3">
          {props.blogPostPreviews.map((preview, index) => {
            return (
              <motion.div
                custom={index}
                variants={CARD_VARIANTS}
                initial="initial"
                animate="animate"
                whileHover="whileHover"
                whileTap="whileTap"
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                key={preview.title}
              >
                <BlogPostPreviewRenderer
                  preview={preview}
                  key={preview.title}
                />
              </motion.div>
            );
          })}
        </div>
      }
      <p>
        View all blog posts <Link href="/blog/all">here</Link>.
      </p>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: BlogProps;
}> {
  const postsListData = await client.queries.postConnection();

  const previews: BlogPostPreview[] = [];

  for (const edge of postsListData.data.postConnection.edges ?? []) {
    if (!edge || !edge.node) {
      continue;
    }
    const post = edge.node;
    previews.push({
      title: post.title,
      heroImage: makeUndefinedNull(post.heroImage),
      author: post.author,
      description: post.description ?? "",
      createdAt: makeUndefinedNull(post.createdAt),
      lastUpdated: makeUndefinedNull(post.lastUpdated),
      link: `/blog/${post._sys.filename}`,
    });
  }

  previews.sort((a, b) => {
    if (a.createdAt === null) {
      return 1;
    }
    if (b.createdAt === null) {
      return -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  await fs.writeFile("./public/rss.xml", await generateRSSFeed(previews));

  previews.splice(4);

  return {
    props: {
      blogPostPreviews: previews,
      appProps: await getAppProps(),
    },
  };
}
