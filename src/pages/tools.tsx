import React from "react";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import Link from "next/link";
import { promises as fs } from "fs";
import { AwesomeArcadeToolsList } from "@/components/AwesomeArcadeList";
import { AnalyticEvents } from "@/components/Analytics";
import Tippy from "@tippyjs/react";
import { useSession } from "next-auth/react";
import { smoothScrollToID } from "@/components/Linkable/Header";
import fetchToolsFromCMS from "@/scripts/FetchListsFromCMS/FetchTools";
import { Tool } from "@/scripts/FetchListsFromCMS/types";
import { stringToBool } from "@/scripts/Utils/StringParsing/FromBool";
import { ToolTableOfContents } from "@/components/AwesomeArcadeList/Tool/toolTableOfContents";

const pageName = "Tools";

type ToolsProps = {
  appProps: AppProps;
  list: Tool[];
};

export function Tools({ appProps, list }: ToolsProps): React.ReactNode {
  const { data: session } = useSession();

  const [disableSearch, setDisableSearch] = React.useState(false);
  const [searchParamsChanged, setSearchParamsChanged] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showNotWebsiteTools, setShowNotWebsiteTools] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState(list);
  const [resultCount, setResultCount] = React.useState<number | undefined>(
    undefined,
  );

  const searchParam = "q";
  const showNotWebsiteParam = "showNotWebsite";

  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get(searchParam);
    if (q !== null) {
      setSearchQuery(q);
    }
    const showNotWebsite = new URLSearchParams(window.location.search).get(
      showNotWebsiteParam,
    );
    if (showNotWebsite !== null) {
      setShowNotWebsiteTools(stringToBool(showNotWebsite));
    }
    runSearch(q, showNotWebsite != null ? stringToBool(showNotWebsite) : null);
    if (window.location.hash.length > 0) {
      smoothScrollToID(window.location.hash.replace("#", ""));
    }
    // eslint-disable-next-line
  }, []);

  const runSearch = (
    query: string | null = null,
    showNotWebsites: boolean | null = null,
  ) => {
    setDisableSearch(true);
    setTimeout(() => {
      const q = query ?? searchQuery;
      const showNon = showNotWebsites ?? showNotWebsiteTools;
      if (q.length > 0 || showNon) {
        const filtered = structuredClone(list);
        let toolCount = 0;
        const group = filtered;
        const normalizeString = (s: string): string => {
          return s.trim().toLowerCase();
        };
        const normalizedSearch = normalizeString(q);
        for (let i = group.length - 1; i >= 0; i--) {
          const tool = group[i];
          if (
            !(
              normalizeString(tool.repo).includes(normalizedSearch) ||
              normalizeString(tool.url).includes(normalizedSearch) ||
              normalizeString(
                JSON.stringify(tool["description"]["children"]),
              ).includes(normalizedSearch) ||
              normalizeString(tool.author).includes(normalizedSearch)
            ) ||
            (!showNon && tool.notAWebsite)
          ) {
            group.splice(i, 1);
          }
        }
        toolCount += group.length;
        setFilteredList(filtered);
        setResultCount(toolCount);
      } else {
        setFilteredList(
          list.filter((tool) => {
            return !tool.notAWebsite;
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
      if (showNon) {
        url.searchParams.set(showNotWebsiteParam, "true");
      } else {
        url.searchParams.delete(showNotWebsiteParam);
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
      description="This is a list of MakeCode Arcade tools that I find super useful (or just plain cool) to use in my projects."
      keywords="Game development, Awesome, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools"
    >
      <h1>
        Welcome to Awesome Arcade Tools
        {session?.user?.name != null ? `, ${session.user.name}` : ""}!
      </h1>
      <p>
        This is a list of {Math.floor(appProps.toolsListed / 10) * 10}+ MakeCode
        Arcade tools that I find super useful (or just plain cool) to use in my
        projects.
      </p>
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      <p>
        To use these tools, follow the links to their website or GitHub
        repository.
      </p>
      <p>
        Want to suggest a new tool or modification? Check out our{" "}
        <Link href="/help/contributing/tools">guide</Link> on how to submit a
        tool to Awesome Arcade!
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
          <Tippy content="Search tools by author, name, description, or URL!">
            <input
              id="searchBar"
              type="search"
              className="form-control"
              placeholder="Search tools by author, name, description, or URL!"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
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
              defaultChecked={showNotWebsiteTools}
              onChange={(e) => {
                setShowNotWebsiteTools(e.target.checked);
                setSearchParamsChanged(true);
              }}
              id="showNotWebsiteToolsCheckInput"
            />
            <label
              className="form-check-label"
              htmlFor="showNotWebsiteToolsCheckInput"
            >
              Show non-browser based tools
            </label>
          </div>
        </div>
      </div>
      {resultCount != undefined ? (
        <p>
          Found {resultCount} tool{resultCount !== 1 ? "s" : ""}.
        </p>
      ) : undefined}
      <details>
        <summary>
          Table of contents{resultCount != undefined ? " (filtered)" : ""}
        </summary>
        <div>
          <ToolTableOfContents list={filteredList} />
        </div>
      </details>
      <div>
        <AwesomeArcadeToolsList list={filteredList} />
      </div>
      <p>
        Looking for Awesome Arcade Extensions? They have been split up into the{" "}
        <Link href="/">Extensions</Link> page! (Which you can also find in the
        navigation bar!)
      </p>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: ToolsProps;
}> {
  const list = await fetchToolsFromCMS();

  await fs.writeFile("./public/tools.json", JSON.stringify(list, undefined, 2));

  return {
    props: {
      appProps: await getAppProps(),
      list: list,
    },
  };
}

export default Tools;
