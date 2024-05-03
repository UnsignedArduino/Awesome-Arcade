import React from "react";
import Tippy from "@tippyjs/react";

const ListLayouts = ["grid", "masonry"] as const;
export type ListLayout = (typeof ListLayouts)[number];

export default function ListLayoutButton({
  state,
  setState,
}: {
  state: ListLayout;
  setState: React.Dispatch<React.SetStateAction<ListLayout>>;
}) {
  const nextState =
    ListLayouts[(ListLayouts.indexOf(state) + 1) % ListLayouts.length];

  React.useEffect(() => {
    const l = window.localStorage.getItem("listLayout");
    if (l) {
      setState(l as ListLayout);
    } else {
      setState("grid");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tippy content={`Switch to ${nextState} layout`}>
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => {
          setState(nextState);
          window.localStorage.setItem("listLayout", nextState);
        }}
      >
        {(() => {
          switch (state) {
            case "grid":
              return <i className="bi bi-columns-gap" />;
            case "masonry":
              return <i className="bi bi-grid" />;
          }
        })()}
      </button>
    </Tippy>
  );
}
