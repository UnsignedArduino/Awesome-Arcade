import React from "react";
import { AuthorsQuery } from "../../../../tina/__generated__/types";
import {
  AvatarImageRenderer,
  RichTextSectionRenderer,
} from "@/components/Blog/Elements";

export default function BlogAuthor({
  data,
}: {
  data: AuthorsQuery;
}): React.ReactNode {
  return (
    <>
      <h1>
        <AvatarImageRenderer
          url={data.authors.avatarURL as string}
          name={data.authors.name}
        />{" "}
        {data.authors.name}
      </h1>
      {data.authors.link ? (
        <p>
          Visit on{" "}
          <a href={data.authors.link} target="_blank" rel="noopener noreferrer">
            {new URL(data.authors.link).hostname}
          </a>
        </p>
      ) : null}
      <RichTextSectionRenderer content={data.authors.bio} />
    </>
  );
}
