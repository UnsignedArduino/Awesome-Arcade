import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import Link from "next/link";
import Image from "next/image";
import { appName } from "@/components/Layout/layout";
import icon from "../../../public/android-chrome-512x512.png";

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
                    {footerThings.map((row, rowIndex): JSX.Element => {
                      return (
                        <tr key={`row-${rowIndex}`}>
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
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-sm table-borderless d-sm-none d-table">
          <tbody>
            {mobileFooterThings.map((thing, rowIndex): JSX.Element => {
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
