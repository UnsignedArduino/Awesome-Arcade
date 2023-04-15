import React from "react";
import ErrorBoundary from "../ErrorBoundary";

export const DEVELOPERS = ["UnsignedArduino"];

function Footer(): JSX.Element {
  return (
    <ErrorBoundary>
      <small className="p-2">
        Awesome Arcade Extensions is developed by{" "}
        {DEVELOPERS.map((dev, index) => {
          return (
            <span key={dev}>
              <a
                href={"https://github.com/" + dev}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dev}
              </a>
              {index < DEVELOPERS.length - 2
                ? ", "
                : index < DEVELOPERS.length - 1
                ? " and "
                : ""}
            </span>
          );
        })}
        .
      </small>
    </ErrorBoundary>
  );
}

export default Footer;
