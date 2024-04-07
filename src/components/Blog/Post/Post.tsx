import React from "react";
import { formatDateAndTime } from "@/scripts/Utils/DateAndTime/Format";
import { Authors, PostQuery } from "../../../../tina/__generated__/types";
import {
  RichTextSectionRenderer,
  ShortAuthorRenderer,
} from "@/components/Blog/Elements";
import Comments from "@/components/Blog/Post/Comments";

export default function BlogPost({
  data,
}: {
  data: PostQuery;
}): React.ReactNode {
  return (
    <>
      <h1>{data.post.title}</h1>
      <p>
        Written by <ShortAuthorRenderer author={data.post.author as Authors} />
        <br />
        {data.post.createdAt != null ? (
          <>
            Posted on {formatDateAndTime(new Date(data.post.createdAt))}.
            {data.post.lastUpdated != null
              ? ` (last updated ${formatDateAndTime(new Date(data.post.lastUpdated))})`
              : null}
          </>
        ) : null}
      </p>
      <p>{data.post.description}</p>
      <hr />
      <RichTextSectionRenderer content={data.post.body} />
      <Comments title={data.post.title} />
      <small>
        <p>
          {(data.post.tags?.length ?? 0) > 0 ? (
            <>
              Tags: <i>{(data.post.tags ?? []).join(", ")}</i>
            </>
          ) : (
            <i>No tags on this blog post.</i>
          )}
        </p>
      </small>
    </>
  );
}
