import React from "react";
import Link from "next/link";

// https://reacthustle.com/blog/nextjs-scroll-to-element
export function smoothScrollHash(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  e.preventDefault();
  const href = e.currentTarget.href;
  setTimeout(() => {
    const hash = href.split("#")[1];
    console.log(`Smooth scrolling to ${hash}`);
    smoothScrollToID(hash);
    window.dispatchEvent(new HashChangeEvent("hashchange", { newURL: href }));
  });
}

export function smoothScrollToID(id: string) {
  const u = new URL(window.location.toString());
  u.hash = id;
  setTimeout(() => {
    window.history.replaceState({}, "", u.toString());
  });
  const e = document.getElementById(id);
  e?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

export function LinkableH2({
  props,
  id,
  url,
  children,
}: {
  props?: any;
  id: string;
  url: string;
  children: React.ReactNode | string;
}): React.ReactNode {
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
        <Link className="ms-1" href={`${url}#${id}`}>
          <i className="bi-link-45deg" />
        </Link>
      ) : undefined}
    </h2>
  );
}

export function LinkableH3({
  props,
  id,
  url,
  children,
}: {
  props?: any;
  id: string;
  url: string;
  children: React.ReactNode | string;
}): React.ReactNode {
  const [showLink, setShowLink] = React.useState(false);

  return (
    <h3
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
        <Link className="ms-1" href={`${url}#${id}`}>
          <i className="bi-link-45deg" />
        </Link>
      ) : undefined}
    </h3>
  );
}
