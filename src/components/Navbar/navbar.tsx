import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavbarDropdownThemePicker } from "./ThemePicker";
import icon from "../../../public/android-chrome-512x512.png";
import { AppProps } from "../WithAppProps";

const NavbarPages = {
  Home: "/",
  Help: "/help",
  GitHub:
    "https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website",
};

type NavbarProps = {
  appName: string;
  appProps: AppProps;
  currentPage?: string;
};

function Navbar({ appName, appProps, currentPage }: NavbarProps): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="d-inline-flex align-items-center text-start">
          <div className="d-inline-block">
            <Image
              src={icon}
              alt="Logo"
              className="d-inline-block"
              style={{ width: "2em", height: "2em", objectFit: "contain" }}
            />
          </div>
          <Link className="navbar-brand mb-0 ms-1 h1" href="/">
            {appName}
          </Link>
          {(() => {
            switch (appProps.environment) {
              case "production": {
                return undefined;
              }
              case "preview": {
                return <span className="badge bg-danger me-2">Beta</span>;
              }
              case "development": {
                return <span className="badge bg-danger me-2">Dev</span>;
              }
            }
          })()}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex">
            <ul className="navbar-nav">
              {Object.entries(NavbarPages).map(([key, value]) => {
                if (currentPage === key) {
                  return (
                    <li className="nav-item" key={key}>
                      <Link
                        className="nav-link active"
                        href={value}
                        aria-current="page"
                      >
                        {key}
                      </Link>
                    </li>
                  );
                } else if (!value.startsWith("/")) {
                  return (
                    <li className="nav-item" key={key}>
                      <a
                        href={value}
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {key}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li className="nav-item" key={key}>
                      <Link className="nav-link" href={value}>
                        {key}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div className="d-flex d-inline d-lg-none">
            <NavbarDropdownThemePicker />
          </div>
        </div>
        <div className="d-flex d-none d-lg-inline">
          <NavbarDropdownThemePicker alignEnd />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
