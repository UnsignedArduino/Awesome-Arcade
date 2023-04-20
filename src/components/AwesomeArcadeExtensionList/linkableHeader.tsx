import React from "react";
import Link from "next/link";

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
