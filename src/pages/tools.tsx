import React from "react";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import Link from "next/link";
import parseOldExtensionXML, {
  ExtensionList,
} from "../scripts/Utils/ParseOldExtensionsXML";
import { promises as fs } from "fs";
import path from "path";
import { smoothScrollToID } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { AwesomeArcadeToolsList } from "@/components/AwesomeArcadeList";
import { debounce } from "@/scripts/Utils/Timers";
import { AnalyticEvents } from "@/components/Analytics";
import Tippy from "@tippyjs/react";
import { useSession } from "next-auth/react";

const pageName = "Tools";

type ToolsProps = { appProps: AppProps; list: ExtensionList };

export function Tools({ appProps, list }: ToolsProps): JSX.Element {
  const { data: session } = useSession();

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
      description="This is a list of MakeCode Arcade tools that I find super useful (or just plain cool) to use in my projects."
      keywords="Game development, Awesome, Tools, Curated, Arcade, Useful, Curated list, MakeCode, Awesome tools, Useful tools, MakeCode Arcade, MakeCode Arcade tools, Arcade tools"
      extraNavbarHTML={
        <Tippy content="Search tools by author or name!">
          <input
            type="text"
            className="form-control"
            placeholder="Search tools by author or name!"
            defaultValue={search}
            onChange={(event) => {
              const v = event.target.value;
              setSearch(v);
              debounce(
                "toolSearchChange",
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
      <h1>
        Welcome to Awesome Arcade Tools
        {session?.user?.name != null ? `, ${session.user.name}` : ""}!
      </h1>
      <p>
        This is a list of MakeCode Arcade tools that I find super useful (or
        just plain cool) to use in my projects.
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
        You can find the old home page <Link href="/old">here</Link>. (please
        note that this page will be removed soon.)
      </p>
      <p>
        Want to suggest a new tool or modification? Head over to our GitHub
        repository and file an{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues/new?assignees=&labels=tool&projects=&template=new-tool.md&title=Add+tool+%5BINSERT+TOOL+URL%5D"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue
        </a>{" "}
        or submit a pull request to{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/edit/main/src/oldExtensions.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          edit the <code>oldExtensions.xml</code>
        </a>{" "}
        file! (A GitHub account is required.)
      </p>
      <div>
        {resultCount != undefined ? (
          <p>
            Found {resultCount.tools} tool{resultCount.tools !== 1 ? "s" : ""}.
          </p>
        ) : undefined}
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
  const list = await parseOldExtensionXML(
    (
      await fs.readFile(path.resolve(process.cwd(), "src", "oldExtensions.xml"))
    ).toString()
  );

  return {
    props: {
      appProps: await getAppProps(),
      list: list,
    },
  };
}

export default Tools;
