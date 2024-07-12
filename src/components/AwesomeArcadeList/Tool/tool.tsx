import React from "react";
import { useRouter } from "next/router";
import { Tool } from "@/scripts/FetchListsFromCMS/types";
import useMasonry from "@/hooks/useMasonry";
import { motion } from "framer-motion";
import { CARD_VARIANTS } from "@/animations/card";
import { AwesomeArcadeToolCard } from "@/components/AwesomeArcadeList/Tool/Cards/AwesomeArcadeToolCard";
import { AwesomeArcadeToolOldCard } from "@/components/AwesomeArcadeList/Tool/Cards/AwesomeArcadeToolOldCard";
import useListLayout from "@/hooks/useListLayout";

export function AwesomeArcadeToolGroup({
  title,
  description,
  tools,
  pad,
}: {
  title?: React.ReactNode | undefined;
  description?: React.ReactNode | undefined;
  tools: Tool[];
  pad?: boolean | undefined;
}): React.ReactNode {
  const layout = useListLayout();

  const masonry = useMasonry(`${title}ToolRow`, layout == "masonry");

  React.useEffect(() => {
    if (layout == "masonry") {
      setTimeout(() => {
        masonry?.reloadItems?.();
        masonry?.layout?.();
      });
    }
  }, [layout, masonry, tools]);

  const router = useRouter();

  const [toolToHighlight, setToolToHighlight] = React.useState<
    string | undefined
  >(undefined);

  const onHashChange = (e?: HashChangeEvent | undefined) => {
    const repo = e
      ? e.newURL.split("#")[1]
      : window.location.hash.replaceAll("#", "");
    console.log(`Changing tool to highlight ${repo}`);
    setToolToHighlight(repo);
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
    <div
      className={pad == undefined || pad ? "mb-3" : ""}
      style={{ overflow: "hidden" }}
    >
      {title}
      {description}
      {(() => {
        switch (layout) {
          case "masonry":
            return (
              <div
                id={`${title}ToolRow`}
                className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"
              >
                {tools.map((tool, index) => {
                  return (
                    <motion.div
                      className="col py-3"
                      key={tool.repo}
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
                      <AwesomeArcadeToolCard
                        tool={tool}
                        highlight={tool.repo === toolToHighlight}
                        pad={index < tools.length - 1 || true}
                      />
                    </motion.div>
                  );
                })}
              </div>
            );
          case "grid":
          default:
            return (
              <div
                id={`${title}ToolRow`}
                className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3"
              >
                {tools.map((tool, index) => {
                  return (
                    <motion.div
                      className="col py-1"
                      key={tool.repo}
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
                      <AwesomeArcadeToolCard
                        tool={tool}
                        highlight={tool.repo === toolToHighlight}
                        pad={index < tools.length - 1 || true}
                      />
                    </motion.div>
                  );
                })}
              </div>
            );
          case "github":
            return tools.map((tool, index) => {
              return (
                <motion.div
                  className="col py-3"
                  key={tool.repo}
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
                  <AwesomeArcadeToolOldCard
                    tool={tool}
                    highlight={tool.repo === toolToHighlight}
                  />
                </motion.div>
              );
            });
        }
      })()}
      {tools.length === 0 && (
        <div className="alert alert-warning" role="alert">
          Could not find any results with your search query!
        </div>
      )}
    </div>
  );
}
