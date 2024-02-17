import { QuickLink } from "@/components/QuickLinks/types";
import Link from "next/link";
import React from "react";

export default function QuickLinkCards({
  quickLinks,
  divColumnClasses = "row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4",
}: {
  quickLinks: QuickLink[];
  divColumnClasses?: string;
}) {
  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={divColumnClasses}>
        {quickLinks.map((quick: QuickLink, index: number) => {
          return (
            <div className="col mb-3 mt-1" key={`help-card-${index}`}>
              <div className="card mb-2 h-100">
                {/* <Image
                    src={quick.image}
                    alt={quick.altText}
                    className="card-img-top"
                    objectFit="cover"
                  /> */}
                <h5 className="card-title m-3 mb-0">{quick.name}</h5>
                <div className="card-body">
                  <div className="card-text">
                    <p>{quick.description}</p>
                  </div>
                  <Link
                    href={
                      quick.link.startsWith("/")
                        ? quick.link
                        : `/help/${quick.link}`
                    }
                    passHref
                    legacyBehavior
                  >
                    <a className="card-link stretched-link">{quick.linkText}</a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
