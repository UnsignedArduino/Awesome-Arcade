import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import ClickableFigure from "@/components/Images/ClickableFigure";
import EmptyNewToolIssueImage from "@/assets/images/help/contributing/tools/empty-new-tool-issue.png";
import FilledOutNewToolIssueImage from "@/assets/images/help/contributing/tools/filled-out-new-tool-issue-template.png";
import { LinkableH2 } from "@/components/Linkable/Header";

const pageName = "Contributing tools";
const url = "/help/contributing/tools";

export function ContributingTools({
  appProps,
}: {
  appProps: AppProps;
}): React.ReactNode {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's guide on contributing tools to the site."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Help, Help page, Contributing, Contributing tools, Contribute tools"
      breadCrumbs={[
        { Help: "/help" },
        { Contributing: "/help/contributing" },
        { Tools: "/help/contributing/tools" },
      ]}
    >
      <h1>{pageName}</h1>
      <>
        <p>
          Thanks for considering to contribute to Awesome Arcade! Submitting a
          tool will allow others to find it, helping others in their game making
          process!
        </p>
        <p>
          There are two main ways to contribute tools to Awesome Arcade: Issues
          and pull requests
        </p>
      </>
      <LinkableH2 id="submit-an-issue" url={url}>
        Submit an issue
      </LinkableH2>
      <>
        <p>
          The GitHub repository that hosts the source code for Awesome Arcade
          accepts issues on new tools! You can use the{" "}
          <a
            href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/issues/new?assignees=&labels=tool&projects=&template=new-tool.md&title=Add+tool+%5BINSERT+TOOL+URL%5D"
            target="_blank"
            rel="noopener noreferrer"
          >
            new tool issue template
          </a>{" "}
          to help you quickly file an issue for me to add a tool to the list.
        </p>
        <p>
          Please insert the relevant information, replacing the brackets as
          necessary.
        </p>
        <p>
          For example, if I wanted to contribute{" "}
          <a
            href="https://github.com/UnsignedArduino/Arcade-MIDI-to-Song"
            target="_blank"
            rel="noopener noreferrer"
          >
            my Arcade-MIDI-to-Song tool
          </a>{" "}
          that helps you play MIDI music in a MakeCode Arcade game, I would
          choose the {'"'}New tool{'"'} issue template:
        </p>
        <ClickableFigure
          id="EmptyNewToolIssueImage"
          src={EmptyNewToolIssueImage}
          alt="A picture of the issue submission form to the Awesome Arcade GitHub repository using the new tool issue template, unmodified."
          caption={`Selecting the "New tool" issue template on the GitHub repository's issue tracker will show this template you can fill out!`}
        />
        <p>
          And then I would fill out the template with information, like this:
        </p>
        <ClickableFigure
          id="FilledOutNewToolIssueImage"
          src={FilledOutNewToolIssueImage}
          alt={`A picture of the issue submission form to the Awesome Arcade GitHub repository using the new extension issue template, modified for the title to say "Add tool https://github.com/UnsignedArduino/Arcade-MIDI-to-Song" and the post content to say: Tool: https://github.com/UnsignedArduino/Arcade-MIDI-to-Song GitHub repo: https://github.com/UnsignedArduino/Arcade-MIDI-to-Song Forum post: https://forum.makecode.com/t/new-song-format/17763/11?u=unsignedarduino Description: I have written a Python script that will turn MIDI files into MakeCode Arcade songs! Note that this tools requires at least Python 3.11 on a computer, and command line knowledge is highly recommended!`}
          caption={`Filling out the "New tool" issue template with the relevant information will help me quickly add the tool to the list!`}
        />
        <p>
          As you can see, the only required information is the tool URL
          (obviously) and the GitHub URL but filling out the other details will
          help me out. Thanks!
        </p>
      </>
      <LinkableH2 id="submit-a-pull-request" url={url}>
        Submit a pull request
      </LinkableH2>
      <>
        <p>
          The GitHub repository that hosts the source code for Awesome Arcade
          accepts pull requests on new tools!
        </p>
        <p>
          Unfortunately, the author was too lazy to describe how to precisely
          add in new tools because of the switch over from an XML file (shudder)
          to TinaCMS which uses Markdown documents. So it{"'"}s recommended to
          follow the first method of submitting an issue. Maybe one day the
          author will get around to finishing this section...
        </p>
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

export default ContributingTools;
