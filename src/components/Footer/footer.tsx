import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import Link from "next/link";

export const DEVELOPERS = ["UnsignedArduino"];

function Footer(): JSX.Element {
  type FooterThing = {
    title: string;
    link: string;
  };

  const footerThings: FooterThing[][] = [
    [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "Help",
        link: "/help",
      },
      {
        title: "About",
        link: "/about",
      },

      {
        title: "Legal",
        link: "/legal",
      },
      {
        title: "GitHub",
        link: "https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website",
      },
    ],
  ];

  const mobileFooterThings = footerThings.flat(Infinity) as FooterThing[];

  return (
    <ErrorBoundary>
      <small>
        <table className="table table-sm table-borderless d-none d-sm-table">
          <tbody>
            {footerThings.map((row, rowIndex): JSX.Element => {
              return (
                <tr key={`row-${rowIndex}`}>
                  {rowIndex === 0 ? (
                    <td className="px-2" rowSpan={footerThings.length}>
                      Awesome Arcade Extensions is developed and maintained by{" "}
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
                      })}{" "}
                      and the{" "}
                      <a
                        href="https://forum.makecode.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MakeCode community
                      </a>
                      .
                    </td>
                  ) : (
                    <></>
                  )}
                  {row.map((thing, colIndex): JSX.Element => {
                    if (thing.link.startsWith("/")) {
                      return (
                        <td key={`col-${colIndex}`}>
                          <Link href={thing.link}>{thing.title}</Link>
                        </td>
                      );
                    } else {
                      return (
                        <td key={`col-${colIndex}`}>
                          <a
                            href={thing.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {thing.title}
                          </a>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="table table-sm table-borderless d-sm-none d-table">
          <tbody>
            {mobileFooterThings.map((thing, rowIndex): JSX.Element => {
              return (
                <tr key={`row-${rowIndex}`}>
                  {rowIndex === 0 ? (
                    <td className="px-2" rowSpan={mobileFooterThings.length}>
                      Awesome Arcade Extensions is developed and maintained by{" "}
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
                      })}{" "}
                      and the{" "}
                      <a
                        href="https://forum.makecode.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MakeCode community
                      </a>
                      .
                    </td>
                  ) : (
                    <></>
                  )}
                  <td>
                    {(() => {
                      if (thing.link.startsWith("/")) {
                        return <Link href={thing.link}>{thing.title}</Link>;
                      } else {
                        return (
                          <a
                            href={thing.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {thing.title}
                          </a>
                        );
                      }
                    })()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </small>
    </ErrorBoundary>
  );
}

export default Footer;
