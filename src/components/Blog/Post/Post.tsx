import React from "react";
import { formatDateAndTime } from "@/scripts/Utils/DateAndTime/Format";
import { Authors, PostQuery } from "../../../../tina/__generated__/types";
import {
  RichTextSectionRenderer,
  ShortAuthorRenderer,
} from "@/components/Blog/Elements";
import Comments from "@/components/Blog/Post/Comments";
import ContextualEditingPostAssist from "@/components/Blog/Post/ContextualEditingMode/PostAssist";
import HeroImage from "@/components/Images/HeroImage";
import { ShareButton } from "@/components/Linkable/ShareButton";
import { getReadingTime } from "@/scripts/Utils/Calculate/readingTime";
import getElement from "@/scripts/Utils/Element";

export default function BlogPost({
  data,
}: {
  data: PostQuery;
}): React.ReactNode {
  const [showTitleActions, setShowTitleActions] = React.useState(false);

  const [readingTime, setReadingTime] = React.useState<number | null>(null);
  React.useEffect(() => {
    setReadingTime(
      getReadingTime(
        (getElement(`blogPostBody${data.post.title}`) as HTMLDivElement)
          .innerText,
      ),
    );
  }, [data.post.title]);

  return (
    <div id={`blogPost${data.post.title}`}>
      <h1
        onMouseEnter={() => {
          setShowTitleActions(true);
        }}
        onMouseLeave={() => {
          setShowTitleActions(false);
        }}
      >
        {data.post.title}{" "}
        {showTitleActions && (
          <>
            <ShareButton
              data={{
                text: `Check out the blog post ${data.post.title} by ${data.post.author} on Awesome Arcade!`,
                url: `/blog/${data.post._sys.filename}`,
              }}
              classNames="ms-1 btn btn-link m-0 p-0"
            />
          </>
        )}
      </h1>
      <p className="placeholder-glow">
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
        <br />
        {readingTime != null ? (
          readingTime
        ) : (
          <span className="placeholder" style={{ width: "2em" }} />
        )}{" "}
        minute read
      </p>
      {data.post.heroImage && (
        <HeroImage
          image={data.post.heroImage}
          alt={`Hero image for post titled "${data.post.title}".`}
        />
      )}
      <p>{data.post.description}</p>
      <hr />
      <ContextualEditingPostAssist />
      <div id={`blogPostBody${data.post.title}`}>
        <RichTextSectionRenderer content={data.post.body} />
      </div>
      {data.post.title !== "TESTING" ? (
        <Comments title={data.post.title} />
      ) : null}
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
    </div>
  );
}
