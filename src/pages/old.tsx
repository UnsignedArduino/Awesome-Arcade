import React from "react";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import AwesomeArcadeExtensionList from "@/components/OldAwesomeArcadeExtensionList/list";
import parseOldExtensionXML, {
  Extension,
  ExtensionList,
  Tool,
} from "../scripts/Utils/ParseOldExtensionsXML";
import { smoothScrollToID } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { debounce } from "@/scripts/Utils/Timers";
import { AnalyticEvents } from "@/components/Analytics";
import Tippy from "@tippyjs/react";
import { promises as fs } from "fs";
import path from "path";

const pageName = "Old home";

type OldHomeProps = { appProps: AppProps; list: ExtensionList };

export function OldHome({ appProps, list }: OldHomeProps): JSX.Element {
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

  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="This is a list of MakeCode Arcade extensions that I find super useful (or just plain cool) in my projects."
      keywords="Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions"
      extraNavbarHTML={
        <Tippy content="Search extensions and tools by author or name!">
          <input
            type="text"
            className="form-control"
            placeholder="Search extensions and tools by author or name!"
            defaultValue={search}
            onChange={(event) => {
              const v = event.target.value;
              setSearch(v);
              debounce(
                "searchChange",
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
      <div className="alert alert-warning" role="alert">
        Please note that this page will be removed soon in favor of the new
        home, extension, and tool pages.
      </div>
      <p>
        Please note that this website is not developed, affiliated, or endorsed
        by Microsoft, the owner of MakeCode Arcade.
      </p>
      <div>
        {resultCount != undefined ? (
          <p>
            Found {resultCount.extensions} extension
            {resultCount.extensions !== 1 ? "s" : ""} and {resultCount.tools}{" "}
            tool{resultCount.tools !== 1 ? "s" : ""}.
          </p>
        ) : undefined}
        <AwesomeArcadeExtensionList list={filteredList} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: OldHomeProps;
}> {
  const list = await parseOldExtensionXML(
    (
      await fs.readFile(path.resolve(process.cwd(), "src", "oldExtensions.xml"))
    ).toString()
  );

  await fs.writeFile(
    "./public/oldExtensions.json",
    JSON.stringify(list, undefined, 2)
  );

  return {
    props: {
      appProps: await getAppProps(),
      list,
    },
  };
}

export default OldHome;
