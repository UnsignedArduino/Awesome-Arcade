import { TinaMarkdown } from "tinacms/dist/rich-text";
import React from "react";
import { Authors } from "../../../tina/__generated__/types";

const PageSection = (props: any) => {
  return (
    <>
      <h2>{props.heading}</h2>
      <p>{props.content}</p>
    </>
  );
};

const components = {
  PageSection,
};

export function RichTextSectionRenderer({ content }: { content: any }) {
  return <TinaMarkdown components={components} content={content} />;
}

export function AuthorRenderer({
  author,
}: {
  author: Authors;
}): React.ReactNode {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={author.avatarURL as string | undefined}
        alt={`Profile picture of ${author.name}`}
        style={{
          width: "1em",
          height: "1em",
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />{" "}
      {author.name}
    </>
  );
}
