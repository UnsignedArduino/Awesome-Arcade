import React from "react";
import { promises as fs } from "fs";
import Layout from "../components/Layout";
import getAppProps, { AppProps } from "../components/WithAppProps";
import Link from "next/link";
import path from "path";
import { smoothScrollToID } from "@/components/OldAwesomeArcadeExtensionList/linkableHeader";
import { AwesomeArcadeExtensionsList } from "@/components/AwesomeArcadeList";
import { debounce } from "@/scripts/Utils/Timers";
import { AnalyticEvents } from "@/components/Analytics";
import Tippy from "@tippyjs/react";
import { useSession } from "next-auth/react";
import { Extension, parseExtensionXML } from "@/scripts/Utils/ParseListXML";
import { useFeatureIsOn } from "@growthbook/growthbook-react";

const pageName = "Extensions";

type ExtensionsProps = {
  appProps: AppProps;
  list: Extension[];
};

export function Extensions({ appProps, list }: ExtensionsProps): JSX.Element {
  const removeOldHome = useFeatureIsOn("remove-old-home");

  const { data: session } = useSession();

  const [search, setSearch] = React.useState("");
  const [filteredList, setFilteredList] = React.useState(list);
  const [resultCount, setResultCount] = React.useState<number | undefined>(
    undefined,
  );

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

  // React.useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
  //       e.preventDefault();
  //     }
  //     if ((e.ctrlKey || e.metaKey) && e.code == "KeyF") {
  //       setTimeout(() => {
  //         console.log("FOCUS FIND");
  //         const searchBar = getElement("searchBar") as HTMLInputElement;
  //         searchBar.focus();
  //       }, 1000);
  //     }
  //   });
  // }, []);

  React.useEffect(() => {
    if (search.length > 0) {
      const filtered = structuredClone(list);
      let extCount = 0;
      const group = filtered;
      const normalizeString = (s: string): string => {
        return s.trim().toLowerCase();
      };
      const normalizedSearch = normalizeString(search);
      for (let i = group.length - 1; i >= 0; i--) {
        const ext = group[i];
        if (
          !(
            normalizeString(ext.repo).includes(normalizedSearch) ||
            normalizeString(ext.url).includes(normalizedSearch) ||
            normalizeString(ext.description).includes(normalizedSearch)
          )
        ) {
          group.splice(i, 1);
        }
      }
      extCount += group.length;
      setFilteredList(filtered);
      setResultCount(extCount);
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
        <Tippy content="Search extensions by author, name, description, or URL!">
          <input
            type="text"
            className="form-control"
            placeholder="Search extensions by author, name, description, or URL!"
            defaultValue={search}
            id="searchBar"
            onChange={(event) => {
              const v = event.target.value;
              setSearch(v);
              debounce(
                "extensionSearchChange",
                () => {
                  AnalyticEvents.sendSearch(v);
                },
                1000,
              );
            }}
            aria-label="Search query"
          />
        </Tippy>
      }
    >
      <h1>
        Welcome to Awesome Arcade Extensions
        {session?.user?.name != null ? `, ${session.user.name}` : ""}!
      </h1>
      <p>
        On this page, you can find my list of MakeCode Arcade extensions that I
        find super useful (or just plain cool) in my projects.
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
      {removeOldHome ? (
        <></>
      ) : (
        <p>
          You can find the old home page <Link href="/old">here</Link>. (please
          note that this page will be removed soon.)
        </p>
      )}

      <p>
        Want to suggest a new extension or modification? Head over to our GitHub
        repository and file an{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues/new?assignees=&labels=extension&projects=&template=new-extension.md&title=Add+extension+%5BINSERT+GITHUB+URL%5D"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue
        </a>{" "}
        or submit a pull request to{" "}
        <a
          href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/edit/main/src/extensions.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          edit the <code>extensions.xml</code>
        </a>{" "}
        file! (A GitHub account is required.)
      </p>
      <div>
        {resultCount != undefined ? (
          <p>
            Found {resultCount} extension
            {resultCount !== 1 ? "s" : ""}.
          </p>
        ) : undefined}
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
  const list = await parseExtensionXML(
    (
      await fs.readFile(path.resolve(process.cwd(), "src", "extensions.xml"))
    ).toString(),
  );

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
