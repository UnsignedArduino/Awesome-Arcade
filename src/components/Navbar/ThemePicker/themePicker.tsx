import React from "react";
import { AnalyticEvents } from "@/components/Analytics/specific";

export type Theme = "Light" | "Dark";
export type ThemeOptions = Theme | "Auto";

declare global {
  interface HTMLElementEventMap {
    themechangerequest: CustomEvent<ThemeOptions>;
    themechange: CustomEvent<ThemeOptions>;
    themeused: CustomEvent<Theme>;
  }
}

export const ThemeContext = React.createContext<Theme>("Light");

function ThemeToIcon({ theme }: { theme: ThemeOptions }): React.ReactNode {
  switch (theme) {
    default:
    case "Auto": {
      return <i className="bi-circle-half" />;
    }
    case "Dark": {
      return <i className="bi-moon-stars" />;
    }
    case "Light": {
      return <i className="bi-sun" />;
    }
  }
}

export function NavbarDropdownThemePicker({
  alignEnd = false,
}: {
  alignEnd?: boolean;
}): React.ReactNode {
  const [dropdownTheme, setDropdownTheme] =
    React.useState<ThemeOptions>("Auto");

  function onThemeChange(event: CustomEvent<ThemeOptions>) {
    setDropdownTheme(event.detail);
  }

  React.useEffect(() => {
    window.document.documentElement.addEventListener(
      "themechange",
      onThemeChange,
    );

    return () => {
      window.document.documentElement.removeEventListener(
        "themechange",
        onThemeChange,
      );
    };
  }, []);

  return (
    <div className="nav-item dropdown">
      <button
        className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <ThemeToIcon theme={dropdownTheme} />
      </button>
      <ul className={`dropdown-menu${alignEnd ? " dropdown-menu-end" : ""}`}>
        <li>
          <button
            type="button"
            className={`dropdown-item${
              dropdownTheme === "Light" ? " active" : ""
            }`}
            aria-current={dropdownTheme === "Light"}
            onClick={() => {
              window.document.documentElement.dispatchEvent(
                new CustomEvent<ThemeOptions>("themechangerequest", {
                  detail: "Light",
                }),
              );
            }}
          >
            <ThemeToIcon theme="Light" /> Light
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`dropdown-item${
              dropdownTheme === "Dark" ? " active" : ""
            }`}
            aria-current={dropdownTheme === "Dark"}
            onClick={() => {
              window.document.documentElement.dispatchEvent(
                new CustomEvent<ThemeOptions>("themechangerequest", {
                  detail: "Dark",
                }),
              );
            }}
          >
            <ThemeToIcon theme="Dark" /> Dark
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`dropdown-item${
              dropdownTheme === "Auto" ? " active" : ""
            }`}
            aria-current={dropdownTheme === "Auto"}
            onClick={() => {
              window.document.documentElement.dispatchEvent(
                new CustomEvent<ThemeOptions>("themechangerequest", {
                  detail: "Auto",
                }),
              );
            }}
          >
            <ThemeToIcon theme="Auto" /> Auto
          </button>
        </li>
      </ul>
    </div>
  );
}

export function ThemeProxy({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [dropdownTheme, setDropdownTheme] =
    React.useState<ThemeOptions>("Auto");
  const [actualTheme, setActualTheme] = React.useState<Theme>("Light");
  const [loadedPreferredTheme, setLoadedPreferredTheme] = React.useState(false);

  function onThemeChangeRequest(event: CustomEvent<ThemeOptions>) {
    setDropdownTheme(event.detail);
  }

  React.useEffect(() => {
    const userTheme = window.localStorage.getItem(
      "theme",
    ) as ThemeOptions | null;
    if (userTheme != null) {
      setDropdownTheme(userTheme);
    } else {
      setDropdownTheme("Auto");
      window.localStorage.setItem("theme", "Auto");
    }
    setLoadedPreferredTheme(true);

    window.document.documentElement.addEventListener(
      "themechangerequest",
      onThemeChangeRequest,
    );
  }, []);

  React.useEffect(() => {
    if (loadedPreferredTheme) {
      const osWantsDark = window.matchMedia("(prefers-color-scheme: dark)");
      switch (dropdownTheme) {
        case "Auto": {
          setActualTheme(osWantsDark ? "Dark" : "Light");
          break;
        }
        default: {
          setActualTheme(dropdownTheme);
          break;
        }
      }
      window.document.documentElement.dispatchEvent(
        new CustomEvent<ThemeOptions>("themechange", {
          detail: dropdownTheme,
        }),
      );
      window.localStorage.setItem("theme", dropdownTheme);

      if (dropdownTheme === "Auto") {
        AnalyticEvents.setUserPreferredTheme(
          osWantsDark.matches ? "auto dark" : "auto light",
        );
      } else {
        AnalyticEvents.setUserPreferredTheme(
          dropdownTheme.toLowerCase() as "light" | "dark",
        );
      }
    }
  }, [dropdownTheme, loadedPreferredTheme]);

  React.useEffect(() => {
    if (loadedPreferredTheme) {
      window.document.documentElement.setAttribute(
        "data-bs-theme",
        actualTheme.toLowerCase(),
      );
    }
    window.document.documentElement.dispatchEvent(
      new CustomEvent<ThemeOptions>("themeused", {
        detail: actualTheme,
      }),
    );
    window.localStorage.setItem("themeUsed", actualTheme);
  }, [actualTheme, loadedPreferredTheme]);

  const [_, setTheme] = React.useState<"dark" | "light">("light");

  function onThemeChange(event: CustomEvent<"Dark" | "Light">) {
    setTheme(event.detail.toLowerCase() as "dark" | "light");
  }

  React.useEffect(() => {
    let theme = window.localStorage.getItem("themeUsed");
    if (theme === null) {
      theme = "light";
    } else {
      theme = theme.toLowerCase();
    }

    window.document.documentElement.addEventListener(
      "themeused",
      onThemeChange,
    );

    setTheme(theme as "dark" | "light");
  }, []);

  return (
    <ThemeContext.Provider value={actualTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProxy;
