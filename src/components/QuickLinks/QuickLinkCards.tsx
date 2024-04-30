import { QuickLink } from "@/components/QuickLinks/types";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { CARD_VARIANTS } from "@/animations/card";

export default function QuickLinkCards({
  quickLinks,
  divColumnClasses = "row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4",
}: {
  quickLinks: QuickLink[];
  divColumnClasses?: string;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className={divColumnClasses}>
        {quickLinks.map((quick: QuickLink, index: number) => {
          return (
            <motion.div
              custom={index}
              variants={CARD_VARIANTS}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              whileTap="whileTap"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="p-3"
              key={`help-card-${index}`}
            >
              <div className="col h-100" key={`help-card-${index}`}>
                <div className="card h-100">
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
                      <a className="card-link stretched-link">
                        {quick.linkText}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
