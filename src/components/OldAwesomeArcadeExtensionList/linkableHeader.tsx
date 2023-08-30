import React from "react";
import Link from "next/link";

// https://reacthustle.com/blog/nextjs-scroll-to-element
export function smoothScrollHash(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  e.preventDefault();
  smoothScrollToID(new URL(e.currentTarget.href).hash);
}

export function smoothScrollToID(id: string) {
  const e = document.getElementById(id);
  e?.scrollIntoView({
    behavior: "smooth",
  });
  const u = new URL(window.location.toString());
  u.hash = id;
  setTimeout(() => {
    window.history.replaceState({}, "", u.toString());
  });
}

export function LinkableH2({
  props,
  id,
  children,
}: {
  props?: any;
  id: string;
  children: JSX.Element | string;
}): JSX.Element {
  const [showLink, setShowLink] = React.useState(false);

  return (
    <h2
      {...props}
      id={id}
      onMouseEnter={() => {
        setShowLink(true);
      }}
      onMouseLeave={() => {
        setShowLink(false);
      }}
    >
      {children}
      {showLink ? (
        <Link className="ms-1" href={`/#${id}`}>
          <i className="bi-link-45deg" />
        </Link>
      ) : undefined}
    </h2>
  );
}
