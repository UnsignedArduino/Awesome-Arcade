import React from "react";
import Link from "next/link";

// https://reacthustle.com/blog/nextjs-scroll-to-element
export function smoothScrollHash(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  // first prevent the default behavior
  e.preventDefault();
  // get the href and remove everything before the hash (#)
  const href = e.currentTarget.href;
  const targetId = href.replace(/.*#/, "");
  // get the element by id and use scrollIntoView
  const elem = document.getElementById(targetId);
  elem?.scrollIntoView({
    behavior: "smooth",
  });
  window.location.replace(href);
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
