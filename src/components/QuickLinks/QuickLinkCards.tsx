import { QuickLink } from "@/components/QuickLinks/types";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { CARD_VARIANTS } from "@/animations/card";
import Image from "next/image";
import { ThemeContext } from "@/components/Navbar/ThemePicker";

export default function QuickLinkCards({
  quickLinks,
  divColumnClasses = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 px-1 pt-1 pb-3",
}: {
  quickLinks: QuickLink[];
  divColumnClasses?: string;
}) {
  const theme = React.useContext(ThemeContext);

  return (
    <div style={{ overflow: "hidden" }}>
      <div className={divColumnClasses}>
        {quickLinks.map((quick: QuickLink, index: number) => {
          const image =
            theme === "Dark" ? quick.image?.darkTheme : quick.image?.lightTheme;
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
              key={`help-card-${index}`}
            >
              <div className="col h-100" key={`help-card-${index}`}>
                <div className="card h-100">
                  {image != undefined ? (
                    <Image
                      src={image!}
                      alt={quick.image?.altText!}
                      className="card-img-top m-2"
                      style={{ objectFit: "contain", height: "128px" }}
                    />
                  ) : undefined}
                  <h5 className="card-title m-3 mb-0">{quick.name}</h5>
                  <div className="card-body">
                    <div className="card-text">
                      <p>{quick.description}</p>
                    </div>
                    {quick.link ? (
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
                    ) : undefined}
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
