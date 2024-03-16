import { TinaMarkdown } from "tinacms/dist/rich-text";
import React from "react";
import { Authors } from "../../../tina/__generated__/types";
import Link from "next/link";

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
  author: Authors;
}): React.ReactNode {
  return (
    <>
      <Link href={`/blog/authors/${author.name}`}>
        <AvatarImageRenderer
          url={author.avatarURL as string}
          name={author.name}
        />{" "}
        {author.name}
      </Link>
    </>
  );
}
