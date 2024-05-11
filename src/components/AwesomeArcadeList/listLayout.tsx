import React from "react";

const ListLayouts = ["masonry", "grid", "github"] as const;
export type ListLayout = (typeof ListLayouts)[number];

declare global {
  interface HTMLElementEventMap {
    listlayoutchange: CustomEvent<ListLayout>;
  }
}

function LayoutToIcon({ layout }: { layout: ListLayout }): React.ReactNode {
  switch (layout) {
    case "masonry":
      return <i className="bi bi-columns-gap" />;
    case "grid":
      return <i className="bi bi-grid-3x3-gap" />;
    case "github":
      return <i className="bi bi-layout-text-sidebar-reverse" />;
  }
}

export default function NavbarDropdownListLayoutPicker({
  alignEnd = false,
}: {
  alignEnd?: boolean;
}) {
  const [layout, setLayout] = React.useState<ListLayout>("masonry");

  React.useEffect(() => {
    const l = window.localStorage.getItem("listLayout");
    if (l) {
      setLayout(l as ListLayout);
    } else {
      setLayout("masonry");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (layout: ListLayout) => {
    setLayout(layout);
    window.localStorage.setItem("listLayout", layout);
    window.document.documentElement.dispatchEvent(
      new CustomEvent<ListLayout>("listlayoutchange", {
        detail: layout,
      }),
    );
  };

  return (
    <div className="nav-item dropdown">
      <button
        className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <LayoutToIcon layout={layout} />
      </button>
      <ul className={`dropdown-menu${alignEnd ? " dropdown-menu-end" : ""}`}>
        <li>
          <button
            type="button"
            className={`dropdown-item${layout === "masonry" ? " active" : ""}`}
            aria-current={layout === "masonry"}
            onClick={() => {
              handleClick("masonry");
            }}
          >
            <LayoutToIcon layout="masonry" /> Masonry
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`dropdown-item${layout === "grid" ? " active" : ""}`}
            aria-current={layout === "grid"}
            onClick={() => {
              handleClick("grid");
            }}
          >
            <LayoutToIcon layout="grid" /> Grid
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`dropdown-item${layout === "github" ? " active" : ""}`}
            aria-current={layout === "github"}
            onClick={() => {
              handleClick("github");
            }}
          >
            <LayoutToIcon layout="github" /> Old layout
          </button>
        </li>
      </ul>
    </div>
  );
}
