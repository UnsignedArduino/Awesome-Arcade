import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import Link from "next/link";
import Image from "next/image";
import { appName } from "@/components/Layout/layout";
import icon from "../../../public/android-chrome-512x512.png";
import { AppProps } from "@/components/WithAppProps";
import {
  formatDateAndTime,
  formatDateLong,
} from "@/scripts/Utils/DateAndTime/Format";

export const DEVELOPERS = ["UnsignedArduino"];
export const CREATION_DATE = new Date("2023-04-15T02:00:20Z");

function Footer({ appProps }: { appProps: AppProps }): React.ReactNode {
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
        title: "Extensions",
        link: "/extensions",
      },
      {
        title: "Tools",
        link: "/tools",
      },
      {
        title: "Help",
        link: "/help",
      },
    ],
    [
      {
        title: "About",
        link: "/about",
      },
      {
        title: "GitHub",
        link: "https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website",
      },
      {
        title: "Legal",
        link: "/legal",
      },
      {
        title: "Status page",
        link: "https://stats.uptimerobot.com/pjpkZH9Y0k",
      },
    ],
  ];

  const mobileFooterThings = footerThings.flat(Infinity) as FooterThing[];

  const footerText = (
    <>
      <Link
        href="/"
        className="d-flex align-items-center mb-2 link-body-emphasis text-decoration-none"
      >
        <Image
          src={icon}
          alt="Logo"
          className="d-inline-block"
          style={{ objectFit: "contain", width: "2em", height: "2em" }}
        />
      </Link>
      © 2024 UnsignedArduino. All rights reserved.
      <br />
      Keeping track of {appProps.extensionsListed} extensions and{" "}
      {appProps.toolsListed} tools since {formatDateLong(CREATION_DATE)}.
      <br />
      {appName} is developed and maintained by{" "}
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
      <br />
      <br />
      This website is not developed, affiliated, or endorsed by Microsoft, the
      owner of MakeCode Arcade. <br />
      Microsoft and MakeCode Arcade are trademarks of the Microsoft group of
      companies.
      <br />
      <br />
      Build{" "}
      <a
        href={`https://github.com/UnsignedArduino/Awesome-Arcade/commit/${appProps.buildHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <code>{appProps.buildHash}</code>
      </a>{" "}
      (branch{" "}
      <a
        href={`https://github.com/UnsignedArduino/Awesome-Arcade/tree/${appProps.buildBranch}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <code>{appProps.buildBranch}</code>
      </a>
      ) on {formatDateAndTime(new Date(appProps.buildTime))}.
    </>
  );

  return (
    <ErrorBoundary>
      <hr className="m-2" />
      <small>
        <table className="table table-sm table-borderless d-none d-sm-table">
          <tbody>
            <tr>
              <td className="px-2">{footerText}</td>
              <td>
                <table className="table table-sm table-borderless d-none d-sm-table">
                  <tbody>
                    {footerThings.map((row, rowIndex): React.ReactNode => {
                      return (
                        <tr key={`row-${rowIndex}`}>
                          {row.map((thing, colIndex): React.ReactNode => {
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
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-sm table-borderless d-sm-none d-table">
          <tbody>
            {mobileFooterThings.map((thing, rowIndex): React.ReactNode => {
              return (
                <tr key={`row-${rowIndex}`}>
                  {rowIndex === 0 ? (
                    <td className="px-2" rowSpan={mobileFooterThings.length}>
                      {footerText}
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
