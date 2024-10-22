import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import React from "react";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import MakeCodeArcadeBlockDoc from "@/components/MakeCodeArcade/BlockDoc";
import AutoLink from "@/components/Linkable/AutoLink";
import MakeCodeArcadeProjectCode from "@/components/MakeCodeArcade/Embed/Code";
import MakeCodeArcadeProjectEditor from "@/components/MakeCodeArcade/Embed/Editor";
import MakeCodeArcadeProjectSimulator from "@/components/MakeCodeArcade/Embed/Simulator";

const tinaComponents = {
  a: (props: any) => {
    return <AutoLink href={props.url}>{props.children}</AutoLink>;
  },
  code_block: (props: any) => {
    return (
      <ThemedSyntaxHighlighter language={props.lang}>
        {props.value}
      </ThemedSyntaxHighlighter>
    );
  },
  Quote: (props: any) => {
    return (
      <div className="border-start border-secondary border-2 ps-2">
        <blockquote cite={props.originalPlaceURL}>
          <RichTextSectionRenderer content={props.quote} />
          <footer>
            —<AutoLink href={props.authorNameURL}>{props.authorName}</AutoLink>,{" "}
            <cite>
              <AutoLink href={props.originalPlaceURL}>
                {props.originalPlace}
              </AutoLink>
            </cite>
          </footer>
        </blockquote>
      </div>
    );
  },
  MakeCodeArcadeBlockDoc,
  MakeCodeArcadeProjectCode,
  MakeCodeArcadeProjectEditor,
  MakeCodeArcadeProjectSimulator,
};

export function RichTextSectionRenderer({
  content,
}: {
  content: TinaMarkdownContent | TinaMarkdownContent[];
}) {
  return <TinaMarkdown components={tinaComponents} content={content} />;
}

export function AvatarImageRenderer({
  url,
  name,
}: {
  url: string;
  name: string;
}): React.ReactNode {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={`Profile picture of ${name}`}
        style={{
          width: "0.9em",
          height: "0.9em",
          objectFit: "contain",
          borderRadius: "50%",
          verticalAlign: "middle",
          marginBottom: "0.15em",
        }}
      />
    </>
  );
}

export function ShortAuthorRenderer({
  author,
}: {
  author: string;
}): React.ReactNode {
  return (
    <>
      <AutoLink href={`https://github.com/${author}`}>
        <AvatarImageRenderer
          url={`https://github.com/${author}.png?size=16`}
          name={author}
        />{" "}
        {author}
      </AutoLink>
    </>
  );
}
