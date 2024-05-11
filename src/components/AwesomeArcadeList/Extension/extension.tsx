import React from "react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import { Extension } from "@/scripts/FetchListsFromCMS/types";
import useMasonry from "@/hooks/useMasonry";
import { motion } from "framer-motion";
import { CARD_VARIANTS } from "@/animations/card";
import { AwesomeArcadeExtensionCard } from "@/components/AwesomeArcadeList/Extension/Cards/AwesomeArcadeExtensionCard";
import { AwesomeArcadeExtensionOldCard } from "@/components/AwesomeArcadeList/Extension/Cards/AwesomeArcadeExtensionOldCard";
import useListLayout from "@/hooks/useListLayout";

export function AwesomeArcadeExtensionGroup({
  title,
  description,
  exts,
  pad,
}: {
  title?: React.ReactNode | undefined;
  description?: React.ReactNode | undefined;
  exts: Extension[];
  pad?: boolean | undefined;
}): React.ReactNode {
  const layout = useListLayout();

  const masonry = useMasonry(`${title}ExtensionRow`, layout == "masonry");

  React.useEffect(() => {
    if (layout === "masonry") {
      setTimeout(() => {
        masonry?.reloadItems?.();
        masonry?.layout?.();
      });
    }
  }, [layout, masonry, exts]);

  const router = useRouter();

  const [extToHighlight, setExtToHighlight] = React.useState<
    string | undefined
  >(undefined);

  const onHashChange = (e?: HashChangeEvent | undefined) => {
    const repo = e
      ? e.newURL.split("#")[1]
      : window.location.hash.replaceAll("#", "");
    console.log(`Changing extension to highlight ${repo}`);
    setExtToHighlight(repo);
  };

  React.useEffect(() => {
    setTimeout(() => {
      onHashChange();
    });

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      onHashChange();
    });

    return () =>
      router.events.off("routeChangeComplete", () => {
        onHashChange();
      });
  }, [router.events]);

  return (
    <div className={pad == undefined || pad ? "mb-3" : ""}>
      {title}
      {description}
      {(() => {
        switch (layout) {
          case "masonry":
          case "grid":
          default:
            return (
              <div
                id={`${title}ExtensionRow`}
                className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"
              >
                {exts.map((ext, index) => {
                  return (
                    <motion.div
                      className="col py-3"
                      key={ext.repo}
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
                    >
                      <AwesomeArcadeExtensionCard
                        ext={ext}
                        highlight={ext.repo === extToHighlight}
                        pad={index < exts.length - 1 || true}
                      />
                    </motion.div>
                  );
                })}
              </div>
            );
          case "github":
            return exts.map((ext, index) => {
              return (
                <motion.div
                  className="col py-3"
                  key={ext.repo}
                  custom={index}
                  variants={CARD_VARIANTS}
                  initial="initial"
                  animate="animate"
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <AwesomeArcadeExtensionOldCard
                    ext={ext}
                    highlight={ext.repo === extToHighlight}
                  />
                </motion.div>
              );
            });
        }
      })()}
      {exts.length === 0 && (
        <div className="alert alert-warning" role="alert">
          Could not find any results with your search query!
        </div>
      )}
    </div>
  );
}
