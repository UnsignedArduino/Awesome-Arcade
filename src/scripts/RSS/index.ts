import { Feed } from "feed";
import { BlogPostPreview } from "@/components/Blog/Post/Preview";
import { getBaseURL, getEnvironment } from "@/scripts/Utils/Environment";

export default async function generateRSSFeed(
  posts: BlogPostPreview[],
): Promise<string> {
  const siteURL = getBaseURL();
  const name = `Awesome Arcade${(() => {
    switch (getEnvironment()) {
      case "development": {
        return " Development";
      }
      case "preview": {
        return " Beta";
      }
      default:
      case "production": {
        return "";
      }
    }
  })()}`;

  let description = "All of Awesome Arcade's blog posts!";

  if (getEnvironment() === "development") {
    description += ` This is the development server's RSS feed. (You probably want to subscribe to the production server's feed which you can find at https://awesome-arcade.vercel.app)`;
  } else if (getEnvironment() === "preview") {
    description += ` This is the beta server's RSS feed! (You probably want to subscribe to the production server's feed which you can find at https://awesome-arcade.vercel.app)`;
  }

  const feed = new Feed({
    title: `${name} Blog`,
    description,
    id: siteURL,
    link: `${siteURL}/blog`,
    language: "en",
    image: `${siteURL}/android-chrome-512x512.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: "© 2024 UnsignedArduino. All rights reserved.",
    generator: name,
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteURL}${post.link}`,
      link: `${siteURL}${post.link}`,
      author: [
        {
          name: post.author.name,
          link: `${siteURL}/blog/authors/${post.author.name}`,
        },
      ],
      image: post.heroImage ? `${siteURL}${post.heroImage}` : undefined,
      description: post.description,
      date: new Date(post.createdAt ?? 0),
    });
  }

  return feed.rss2();
}
