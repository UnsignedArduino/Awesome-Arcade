import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import ClickableFigure from "@/components/Images/ClickableFigure";
import EmptyNewExtensionIssueImage from "@/assets/images/help/contributing/extensions/empty-new-extension-issue.png";
import FilledOutNewExtensionIssueImage from "@/assets/images/help/contributing/extensions/filled-out-new-extension-issue-template.png";
import { LinkableH2 } from "@/components/Linkable/Header";

const pageName = "Contributing extensions";
const url = "/help/contributing/extensions";

export function ContributingExtensions({
  appProps,
}: {
  appProps: AppProps;
}): React.ReactNode {
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
            accepts pull requests on new extensions!
          </p>
          <p>
            Unfortunately, the author was too lazy to describe how to precisely
            add in new extensions because of the switch over from an XML file
            (shudder) to TinaCMS which uses Markdown documents. So it{"'"}s
            recommended to follow the first method of submitting an issue. Maybe
            one day the author will get around to finishing this section...
          </p>
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
