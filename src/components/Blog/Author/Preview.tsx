import React from "react";
import Link from "next/link";
import { AvatarImageRenderer } from "@/components/Blog/Elements";

export type BlogAuthorPreview = {
  name: string;
  link: string;
  avatarURL: string | null | undefined;
};

export default function BlogAuthorPreviewRenderer({
  preview,
}: {
  preview: BlogAuthorPreview;
}): React.ReactNode {
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <h5 className="card-title">
            <AvatarImageRenderer
              url={preview.avatarURL as string}
              name={preview.name}
            />{" "}
            {preview.name}
          </h5>
          {preview.link ? (
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Visit on{" "}
              <a href={preview.link} target="_blank" rel="noopener noreferrer">
                {new URL(preview.link).hostname}
              </a>
            </h6>
          ) : null}
          <Link href={`/blog/authors/${preview.name}`} className="card-link">
            View profile
          </Link>
        </div>
      </div>
    </>
  );
}
