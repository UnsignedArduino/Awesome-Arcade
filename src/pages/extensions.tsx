import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import Link from "next/link";
import { AwesomeArcadeExtensionsList } from "@/components/AwesomeArcadeList";
import { AnalyticEvents } from "@/components/Analytics";
import { useSession } from "next-auth/react";
import Tippy from "@tippyjs/react";
import fetchExtensionsFromCMS from "@/scripts/FetchListsFromCMS/FetchExtensions";
import { Extension } from "@/scripts/FetchListsFromCMS/types";
import { smoothScrollToID } from "@/components/Linkable/Header";
import { stringToBool } from "@/scripts/Utils/StringParsing/FromBool";
import { ExtensionTableOfContents } from "@/components/AwesomeArcadeList/Extension/extensionTableOfContents";

const pageName = "Extensions";

type ExtensionsProps = {
  appProps: AppProps;
  list: Extension[];
};

export function Extensions({
  appProps,
  list,
}: ExtensionsProps): React.ReactNode {
  const { data: session } = useSession();

  const [disableSearch, setDisableSearch] = React.useState(false);
  const [searchParamsChanged, setSearchParamsChanged] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showJSOnlyExts, setShowJSOnlyExts] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState(list);
  const [resultCount, setResultCount] = React.useState<number | undefined>(
    undefined,
  );

  const searchParam = "q";
  const showJSOnlyParam = "showJSOnly";

  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get(searchParam);
    if (q !== null) {
      setSearchQuery(q);
    }
    const showJSOnly = new URLSearchParams(window.location.search).get(
      showJSOnlyParam,
    );
    if (showJSOnly !== null) {
      setShowJSOnlyExts(stringToBool(showJSOnly));
    }
    runSearch(q, showJSOnly != null ? stringToBool(showJSOnly) : null);
    if (window.location.hash.length > 0) {
      smoothScrollToID(window.location.hash.replace("#", ""));
    }
    // eslint-disable-next-line
  }, []);

  const runSearch = (
    query: string | null = null,
    showJSOnly: boolean | null = null,
  ) => {
    setDisableSearch(true);
    setTimeout(() => {
      const q = query ?? searchQuery;
      const showJS = showJSOnly ?? showJSOnlyExts;
      setSearchQuery(q);
      setShowJSOnlyExts(showJS);
      if (q.length > 0 || showJS) {
        const filtered = structuredClone(list);
        let extCount = 0;
        const group = filtered;
        const normalizeString = (s: string): string => {
          return s.trim().toLowerCase();
        };
        const normalizedSearch = normalizeString(q);
        for (let i = group.length - 1; i >= 0; i--) {
          const ext = group[i];
          if (
            !(
              normalizeString(ext.repo).includes(normalizedSearch) ||
              normalizeString(ext.url).includes(normalizedSearch) ||
              normalizeString(
                JSON.stringify(ext["description"]["children"]),
              ).includes(normalizedSearch) ||
              normalizeString(ext.author).includes(normalizedSearch)
            ) ||
            (!showJS && ext.javascriptOnly)
          ) {
            group.splice(i, 1);
          }
        }
        extCount += group.length;
        setFilteredList(filtered);
        setResultCount(extCount);
      } else {
        setFilteredList(
          list.filter((ext) => {
            return !ext.javascriptOnly;
          }),
        );
        setResultCount(undefined);
      }
      const url = new URL(window.location.toString());
      if (q === "") {
        url.searchParams.delete(searchParam);
      } else {
        url.searchParams.set(searchParam, q);
      }
      if (showJS) {
        url.searchParams.set(showJSOnlyParam, "true");
      } else {
        url.searchParams.delete(showJSOnlyParam);
      }
      window.history.replaceState({}, "", url.toString());
      AnalyticEvents.sendSearch(q);
      setDisableSearch(false);
      setSearchParamsChanged(false);
    });
  };

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="This is a list of MakeCode Arcade extensions that I find super useful (or just plain cool) in my projects."
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions"
    >
      <h1>
        Welcome to Awesome Arcade Extensions
        {session?.user?.name != null ? `, ${session.user.name}` : ""}!
      </h1>
      <p>
        On this page, you can find my list of{" "}
        {Math.floor(appProps.extensionsListed / 10) * 10}+ MakeCode Arcade
        extensions that I find super useful (or just plain cool) in my projects.
      </p>
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      <p>
        Need help with adding extensions? Check out our{" "}
        <Link href="/help/adding-extensions">guide</Link> on how to add
        extensions to MakeCode Arcade!
      </p>
      <p>
        Want to suggest a new extension or modification? Check out our{" "}
        <Link href="/help/contributing/extensions">guide</Link> on how to submit
        an extension to Awesome Arcade!
      </p>
      <div className="row g-3 align-items-center mb-2">
        <div className="col-auto">
          <label htmlFor="searchBar" className="col-form-label">
            Search:
          </label>
        </div>
        <div className="col-auto">
          <style>
            {`
              input[type=search]::-webkit-search-cancel-button {
                -webkit-appearance: searchfield-cancel-button;
              }
            `}
          </style>
          <Tippy content="Search extensions by author, name, description, or URL!">
            <input
              id="searchBar"
              type="search"
              className="form-control"
              placeholder="Search extensions by author, name, description, or URL!"
              // disabled={disableSearch}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchParamsChanged(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runSearch();
                  e.currentTarget.focus();
                }
              }}
              aria-label="Search query"
            />
          </Tippy>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            disabled={disableSearch || !searchParamsChanged}
            onClick={() => {
              runSearch();
            }}
          >
            Search
          </button>
        </div>
        <div className="col-auto">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={showJSOnlyExts}
              onChange={(e) => {
                setShowJSOnlyExts(e.target.checked);
                setSearchParamsChanged(true);
              }}
              id="showJSOnlyExtsCheckInput"
            />
            <label
              className="form-check-label"
              htmlFor="showJSOnlyExtsCheckInput"
            >
              Show JavaScript-only extensions
            </label>
          </div>
        </div>
      </div>
      {resultCount != undefined ? (
        <p>
          Found {resultCount} extension
          {resultCount !== 1 ? "s" : ""}.
        </p>
      ) : undefined}
      <details>
        <summary>
          Table of contents{resultCount != undefined ? " (filtered)" : ""}
        </summary>
        <div>
          <ExtensionTableOfContents list={filteredList} />
        </div>
      </details>
      <div>
        <AwesomeArcadeExtensionsList list={filteredList} />
      </div>
      <p>
        Looking for Awesome Arcade Tools? They have been moved to the{" "}
        <Link href="/tools">Tools</Link> page! (Which you can also find in the
        navigation bar!)
      </p>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: ExtensionsProps;
}> {
  const list = await fetchExtensionsFromCMS();

  await fs.writeFile(
    "./public/extensions.json",
    JSON.stringify(list, undefined, 2),
  );

  return {
    props: {
      appProps: await getAppProps(),
      list: list,
    },
  };
}

export default Extensions;
