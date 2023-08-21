import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import generateSiteWebmanifest from "../scripts/Utils/SiteWebmanifest/manifest";
import Link from "next/link";
import parseExtensionXML, {
  ExtensionList,
} from "@/scripts/Utils/ParseExtensionsXML";
import path from "path";
import { smoothScrollToID } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { ClickCountContext } from "@/components/contexts";
import { AwesomeArcadeExtensionsList } from "@/components/AwesomeArcadeExtensionList";
import { debounce } from "@/scripts/Utils/Timers";
import { AnalyticEvents } from "@/components/Analytics";
import Tippy from "@tippyjs/react";

const pageName = "Extensions";

type ExtensionsProps = { appProps: AppProps; list: ExtensionList };

export type ClickCountListing = { [repo: string]: number };

declare global {
  interface HTMLElementEventMap {
    clickrepo: CustomEvent<string>;
    repoclickcountchange: CustomEvent<{
      repo: string;
      count: string | undefined;
    }>;
  }
}

export function Extensions({ appProps, list }: ExtensionsProps): JSX.Element {
  const [search, setSearch] = React.useState("");
  const [filteredList, setFilteredList] = React.useState(list);
  const [resultCount, setResultCount] = React.useState<
    { extensions: number; tools: number } | undefined
  >(undefined);

  const searchParam = "q";

  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search).get(searchParam);
    if (q !== null) {
      setSearch(q);
    }
    if (window.location.hash.length > 0) {
      smoothScrollToID(window.location.hash.replace("#", ""));
    }
  }, []);

  React.useEffect(() => {
    const url = new URL(window.location.toString());
    if (search === "") {
      url.searchParams.delete(searchParam);
    } else {
      url.searchParams.set(searchParam, search);
    }
    window.history.replaceState({}, "", url.toString());
  }, [search]);

  React.useEffect(() => {
    if (search.length > 0) {
      const filtered = structuredClone(list);
      let extCount = 0;
      let toolCount = 0;
      for (const group of Object.values(filtered)) {
        for (let i = group.length - 1; i >= 0; i--) {
          if (
            !group[i].repo
              .trim()
              .toLowerCase()
              .includes(search.trim().toLowerCase())
          ) {
            group.splice(i, 1);
          }
        }
        if (group.length > 0) {
          switch (group[0].type) {
            case "Extension": {
              extCount += group.length;
              break;
            }
            case "Tool": {
              toolCount += group.length;
              break;
            }
          }
        }
      }
      setFilteredList(filtered);
      setResultCount({
        extensions: extCount,
        tools: toolCount,
      });
    } else {
      setFilteredList(list);
      setResultCount(undefined);
    }
  }, [search, list]);

  const [clickCounts, setClickCounts] = React.useState<
    ClickCountListing | undefined
  >(undefined);

  const refreshAllClickCounts = () => {
    console.log("Refreshing click counts");
    fetch(`${window.location.origin}/api/all/`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setClickCounts(json);
        console.log(
          `Successfully refreshed ${Object.keys(json).length} click counts`
        );
      })
      .catch((error) => {
        setClickCounts(undefined);
        console.error(`Error fetching click counts: ${error}`);
      });
  };

  const refreshCountsRef = React.useRef<number | undefined>(undefined);
  const REFRESH_CLICK_COUNT_PERIOD = 1000 * 60 * 2;

  React.useEffect(() => {
    refreshAllClickCounts();

    refreshCountsRef.current = window.setInterval(
      refreshAllClickCounts,
      REFRESH_CLICK_COUNT_PERIOD
    );
    return () => {
      window.clearInterval(refreshCountsRef.current);
    };
  }, []); // eslint-disable-line

  // I hate closures
  const clickCountRef = React.useRef<ClickCountListing | undefined>(undefined);

  React.useEffect(() => {
    clickCountRef.current = clickCounts;
  }, [clickCounts]);

  const logRepoClickFromEvent = (event: CustomEvent<string>) => {
    const repo = event.detail;
    fetch(`${window.location.origin}/api/click?repo=${repo}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const repo = Object.keys(json)[0];
        if (clickCountRef.current != undefined) {
          const counts = structuredClone(clickCountRef.current);
          counts[repo] = json[repo];
          setClickCounts(counts);
        } else {
          throw new Error("Click count cache is undefined");
        }
      })
      .catch((error) => {
        setClickCounts(undefined);
        console.error(
          `Error refreshing individual click count for ${repo}: ${error}`
        );
      });
  };

  React.useEffect(() => {
    window.document.documentElement.addEventListener(
      "clickrepo",
      logRepoClickFromEvent
    );
    return () => {
      window.document.documentElement.removeEventListener(
        "clickrepo",
        logRepoClickFromEvent
      );
    };
  }, []); // eslint-disable-line

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description=""
      keywords=""
      extraNavbarHTML={
        <Tippy content="Search extensions by author or name!">
          <input
            type="text"
            className="form-control"
            placeholder="Search extensions by author or name!"
            defaultValue={search}
            onChange={(event) => {
              const v = event.target.value;
              setSearch(v);
              debounce(
                "extensionSearchChange",
                () => {
                  AnalyticEvents.sendSearch(v);
                },
                1000
              );
            }}
            aria-label="Search query"
          />
        </Tippy>
      }
    >
      <h1>Welcome to Awesome Arcade Extensions</h1>
      <p>
        This is a list of MakeCode Arcade extensions that I find super useful
        (or just plain cool) in my projects.
      </p>
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      <p>
        To use these extensions, you will need to import them. First go to the
        toolbox, click on <code>Extensions</code>, and you will see a text box
        that says <code>Search or enter project URL...</code> This is where you
        will paste in the URL to the extension. The URL will be posted along
        with the extensions below.
      </p>
      <p>
        You can find the old home page <Link href="/old">here</Link>.
      </p>
      <div>
        {resultCount != undefined ? (
          <p>
            Found {resultCount.extensions} extension
            {resultCount.extensions !== 1 ? "s" : ""}.
          </p>
        ) : undefined}
        <ClickCountContext.Provider value={clickCounts}>
          <AwesomeArcadeExtensionsList list={filteredList} />
        </ClickCountContext.Provider>
      </div>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: ExtensionsProps;
}> {
  await fs.writeFile(
    "./public/site.webmanifest",
    await generateSiteWebmanifest()
  );

  const list = await parseExtensionXML(
    (
      await fs.readFile(path.resolve(process.cwd(), "src", "extensions.xml"))
    ).toString()
  );

  await fs.writeFile(
    "./public/extensions.json",
    JSON.stringify(list, undefined, 2)
  );

  return {
    props: {
      appProps: await getAppProps(),
      list: list,
    },
  };
}

export default Extensions;
