import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import ClickableFigure from "@/components/Figure/ClickableFigure";
import EmptyNewExtensionIssueImage from "@/assets/images/help/contributing/extensions/empty-new-extension-issue.png";
import FilledOutNewExtensionIssueImage from "@/assets/images/help/contributing/extensions/filled-out-new-extension-issue-template.png";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import { LinkableH2, LinkableH3 } from "@/components/Linkable/Header";

const pageName = "Contributing extensions";
const url = "/help/contributing/extensions";

export function ContributingExtensions({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's guide on contributing extensions to the site."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Help, Help page, Contributing, Contributing extensions, Contribute extensions"
      breadCrumbs={[
        { Help: "/help" },
        { Contributing: "/help/contributing" },
        { Extensions: "/help/contributing/extensions" },
      ]}
    >
      <>
        <h1>{pageName}</h1>
        <>
          <p>
            Thanks for considering to contribute to Awesome Arcade! Submitting
            an extension will allow others to find it, helping others in their
            game making process!
          </p>
          <p>
            There are two main ways to contribute extensions to Awesome Arcade:
            Issues and pull requests.
          </p>
        </>
        <LinkableH2 id="submit-an-issue" url={url}>
          Submit an issue
        </LinkableH2>
        <>
          <p>
            The GitHub repository that hosts the source code for Awesome Arcade
            accepts issues on new extensions! You can use the{" "}
            <a
              href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues/new?assignees=&labels=extension&projects=&template=new-extension.md&title=Add+extension+%5BINSERT+GITHUB+URL%5D"
              target="_blank"
              rel="noopener noreferrer"
            >
              new extension issue template
            </a>{" "}
            to help you quickly file an issue for me to add an extension to the
            list.
          </p>
          <p>
            Please insert the relevant information, replacing the brackets as
            necessary.
          </p>
          <p>
            For example, if I wanted to contribute{" "}
            <a
              href="https://github.com/riknoll/arcade-mini-menu"
              target="_blank"
              rel="noopener noreferrer"
            >
              riknoll{"'"}s arcade-mini-menu extension
            </a>{" "}
            that helps you use menus in a MakeCode Arcade game, I would choose
            the {'"'}New extension{'"'} issue template:
          </p>
          <ClickableFigure
            id="EmptyNewExtensionIssueImage"
            src={EmptyNewExtensionIssueImage}
            alt="A picture of the issue submission form to the Awesome Arcade GitHub repository using the new extension issue template, unmodified."
            caption={`Selecting the "New extension" issue template on the GitHub repository's issue tracker will show this template you can fill out!`}
          />
          <p>
            And then I would fill out the template with information, like this:
          </p>
          <ClickableFigure
            id="FilledOutNewExtensionIssueImage"
            src={FilledOutNewExtensionIssueImage}
            alt={`A picture of the issue submission form to the Awesome Arcade GitHub repository using the new extension issue template, modified for the title to say "Add extension https://github.com/riknoll/arcade-mini-menu" and the post content to say: GitHub repo: https://github.com/riknoll/arcade-mini-menu Forum post: https://forum.makecode.com/t/arcade-mini-menu-extension/14368?u=unsignedarduino Demo: https://riknoll.github.io/arcade-mini-menu/ Description: This extension is a much more advanced and highly customizable version of (the now depreciated) \`arcade-custom-menu\` that has tons of options to customize your menus to fit your game's theme! The menu is also a sprite, which allows you to use all standard sprite blocks on it. This adds a category to the toolbox called \`Mini Menu\`.`}
            caption={`Filling out the "New extension" issue template with the relevant information will help me quickly add the extension to the list!`}
          />
          <p>
            As you can see, the only required information is the extension URL
            (obviously) but filling out the other details will help me out.
            Thanks!
          </p>
        </>
        <LinkableH2 id="submit-a-pull-request" url={url}>
          Submit a pull request
        </LinkableH2>
        <>
          <p>
            The GitHub repository that hosts the source code for Awesome Arcade
            accepts pull requests on new extensions! You can{" "}
            <a
              href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/edit/main/src/extensions.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              edit the <code>extensions.xml</code>
            </a>{" "}
            file to add an extension to the list. (Yes, it resides in an XML
            file.) Editing it will automatically fork the repository, afterwards
            you can submit a pull request to merge your changes into the main
            repository.
          </p>
          <p>You{"'"}ll see an XML file like this:</p>
          <ThemedSyntaxHighlighter language="xml">{`<?xml version="1.0" encoding="utf-8"?>
<allExtensions>
  <extensionList label="Not built in">
    <extension repo="jwunderl/arcade-tilemap-a-star">
      <description>Help your sprites find their way around your tilemaps with this extension! Just provide 2 locations on a tilemap, and it will automagically compute the fastest path between the 2 spots while also moving around walls using the [A* algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)! This will add another section in the \`Scene\` category called \`Path Following\` in the toolbox.</description>
      <links>
        <url label="GitHub repo" isPrimary="true">https://github.com/jwunderl/arcade-tilemap-a-star</url>
        <url label="Forum post">https://forum.makecode.com/t/tilemap-path-finding-a-beta/1846?u=unsignedarduino</url>
        <url label="Demo">https://arcade.makecode.com/12103-88074-48013-42311</url>
        <url label="Wikipedia article on the A* algorithm">https://en.wikipedia.org/wiki/A*_search_algorithm</url>
      </links>
    </extension>
    <!-- More extensions... -->
  </extensionList>
</allExtensions>`}</ThemedSyntaxHighlighter>
          <p>
            To add an extension, add it to the end of the{" "}
            <code>
              {"<"}extensionList{">"}
            </code>{" "}
            element.
          </p>
          <p>
            For example, if I wanted to contribute{" "}
            <a
              href="https://github.com/riknoll/arcade-mini-menu"
              target="_blank"
              rel="noopener noreferrer"
            >
              riknoll{"'"}s arcade-mini-menu extension
            </a>{" "}
            that helps you use menus in a MakeCode Arcade game, I would add the
            following XML to the end of the{" "}
            <code>
              {"<"}extensionList{">"}
            </code>{" "}
            element like so:
          </p>
          <ThemedSyntaxHighlighter language="xml">{`    <extension repo="riknoll/arcade-mini-menu">
      <description>This extension is a much more advanced and highly customizable version of (the now depreciated) \`arcade-custom-menu\` that has tons of options to customize your menus to fit your game's theme! The menu is also a sprite, which allows you to use all standard sprite blocks on it. This adds a category to the toolbox called \`Mini Menu\`.</description>
      <links>
        <url label="GitHub repo" isPrimary="true">https://github.com/riknoll/arcade-mini-menu</url>
        <url label="Forum post">https://forum.makecode.com/t/arcade-mini-menu-extension/14368?u=unsignedarduino</url>
        <url label="Demo">https://riknoll.github.io/arcade-mini-menu/</url>
      </links>
    </extension>`}</ThemedSyntaxHighlighter>
        </>
        <LinkableH3 id="extension-xml-elements" url={url}>
          Extension XML elements
        </LinkableH3>
        <>
          <p>
            Here is a sample using all the possible XML elements in an{" "}
            <code>{`<extension>`}</code>:
          </p>
          <ThemedSyntaxHighlighter language="xml">{`    <extension repo="user/github-repo">
      <description>Some description about the extension's capabilities.</description>
      <links>
        <url label="GitHub repo" isPrimary="true">GitHub repo link</url>
        <url label="Forum post">Link to forum post</url>
        <url label="Demo">Link to demo</url>
        <!-- There can be multiple links with any label -->
      </links>
      <forks>
        <extensionRef repo="user/github-repo" />
        <!-- There can be multiple forks -->
      </forks>
      <depreciatedBy>
        <extensionRef repo="user/github-repo" />
        <!-- There can be multiple extensions depreciating this extension -->
      </depreciatedBy>
      <inBeta asOf="some date">
        Some description why.
      </inBeta>
    </extension>
`}</ThemedSyntaxHighlighter>
        </>
      </>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { appProps: AppProps };
}> {
  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default ContributingExtensions;
