import { Authors } from "../../../../tina/__generated__/types";
import React from "react";
import { ShortAuthorRenderer } from "@/components/Blog/Elements";
import { formatDateAndTime } from "@/scripts/Utils/DateAndTime/Format";
import Link from "next/link";
import { ShareButton } from "@/components/Linkable/ShareButton";
import { AnalyticEvents } from "@/components/Analytics";

export type BlogPostPreview = {
  title: string;
  heroImage: string | null;
  author: Authors;
  description: string;
  createdAt: string | null;
  lastUpdated: string | null;
  link: string;
};

export default function BlogPostPreviewRenderer({
  preview,
}: {
  preview: BlogPostPreview;
}): React.ReactNode {
  const [showCardActions, setShowCardActions] = React.useState(false);

  return (
    <>
      <div className="card mb-2">
        {preview.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="card-img-top"
            style={{
              width: "100%",
              objectFit: "cover",
              maxHeight: "10vh",
            }}
            src={preview.heroImage}
            alt={`Hero image for post titled "${preview.title}".`}
          />
        )}
        <div className="card-body">
          <h5
            className="card-title d-flex align-items-center"
            onMouseEnter={() => {
              setShowCardActions(true);
            }}
            onMouseLeave={() => {
              setShowCardActions(false);
            }}
          >
            {preview.title}
            {showCardActions ? (
              <>
                <ShareButton
                  data={{
                    text: `Check out the blog post ${preview.title} by ${preview.author} on Awesome Arcade!`,
                    url: preview.link,
                  }}
                  onClick={() => {
                    AnalyticEvents.sendShare("blog preview", preview.title);
                  }}
                />
              </>
            ) : undefined}
          </h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {preview.createdAt !== null ? (
              <>
                Posted by <ShortAuthorRenderer author={preview.author} /> on{" "}
                {formatDateAndTime(new Date(preview.createdAt))}.
                {preview.lastUpdated !== null
                  ? ` (last updated ${formatDateAndTime(new Date(preview.lastUpdated))})`
                  : null}
              </>
            ) : (
              <ShortAuthorRenderer author={preview.author} />
            )}
          </h6>
          <p className="card-text">{preview.description}</p>
          <Link href={preview.link} className="card-link">
            View post
          </Link>
        </div>
      </div>
    </>
  );
}
