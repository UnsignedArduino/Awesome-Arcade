import React from "react";
import getAppProps, { AppProps } from "@/components/WithAppProps";
import Layout from "@/components/Layout";
import ClickableFigure from "@/components/Figure/ClickableFigure";
import EmptyNewToolIssueImage from "@/assets/images/help/contributing/tools/empty-new-tool-issue.png";
import FilledOutNewToolIssueImage from "@/assets/images/help/contributing/tools/filled-out-new-tool-issue-template.png";
import ThemedSyntaxHighlighter from "@/components/Themed/SyntaxHighlighter";
import { LinkableH2, LinkableH3 } from "@/components/Linkable/Header";

const pageName = "Contributing tools";
const url = "/help/contributing/tools";

export function ContributingTools({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
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
          accepts pull requests on new tools! You can{" "}
          <a
            href="https://github.com/UnsignedArduino/Awesome-Arcade-Extensions-Website/edit/main/src/tools.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            edit the <code>tools.xml</code>
          </a>{" "}
          file to add a tool the list. (Yes, it resides in an XML file.) Editing
          it will automatically fork the repository, afterwards you can submit a
          pull request to merge your changes into the main repository.
        </p>
        <p>You{"'"}ll see an XML file like this:</p>
        <ThemedSyntaxHighlighter language="xml">{`<?xml version="1.0" encoding="utf-8"?>
<allTools>
  <toolList label="Tools">
    <tool repo="kristianpedersen/Convert-Image-to-MakeCode-Arcade-Sprite">
      <description>This tool will convert your images (like \`.png\` files) to Arcade code! Simply copy the output, open JavaScript mode in your project, navigate to where you want the image block to go, and paste in the image code! You may need to remove some redundant characters. Remember that Arcade has a maximum image size of 500x500!</description>
      <links>
        <url label="Tool" isPrimary="true">https://kristianpedersen.github.io/Convert-Image-to-MakeCode-Arcade-Sprite/</url>
        <url label="GitHub repo">https://github.com/kristianpedersen/Convert-Image-to-MakeCode-Arcade-Sprite</url>
        <url label="Forum post">https://forum.makecode.com/t/ive-made-an-image-file-to-arcade-sprite-converter-feedback-and-code-improvements-wanted/2076?u=unsignedarduino</url>
      </links>
    </tool>
    <!-- More tools... -->
  </toolList>
</allTools>`}</ThemedSyntaxHighlighter>
        <p>
          To add a tool, add it to the end of the <code>{`<toolList>`}</code>{" "}
          element.
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
          that helps you play MIDI music in a MakeCode Arcade game, I would add
          the following XML to the end of the <code>{`<toolList>`}</code>{" "}
          element like so:
        </p>
        <ThemedSyntaxHighlighter language="xml">{`    <tool repo="UnsignedArduino/Arcade-MIDI-to-Song">
      <description>I have written a Python script that will turn MIDI files into MakeCode Arcade songs! Note that this tools requires at least Python 3.11 on a computer, and command line knowledge is highly recommended!</description>
      <links>
        <url label="GitHub repo" isPrimary="true">https://github.com/UnsignedArduino/Arcade-MIDI-to-Song</url>
        <url label="Forum post">https://forum.makecode.com/t/new-song-format/17763/11?u=unsignedarduino</url>
        <url label="Demos">https://forum.makecode.com/t/piano-synthesia/22138?u=unsignedarduino</url>
      </links>
    </tool>`}</ThemedSyntaxHighlighter>
      </>
      <LinkableH3 id="tool-xml-elements" url={url}>
        Tool XML elements
      </LinkableH3>
      <>
        <p>
          Here is a sample using all the possible XML elements in a{" "}
          <code>{`<tool>`}</code>:
        </p>
        <ThemedSyntaxHighlighter language="xml">{`    <tool repo="user/github-repo">
      <description>Some description about the tool's capabilities.</description>
      <links>
        <url label="Tool" isPrimary="true">The tool's link (for example, a web page)</url>
        <url label="GitHub repo">GitHub repo link</url>
        <url label="Forum post">Link to forum post</url>
        <!-- There can be multiple links with any label -->
      </links>
      <forks>
        <toolRef repo="user/github-repo" />
        <!-- There can be multiple forks elements -->      
      </forks>
      <depreciatedBy>
        <toolRef repo="user/github-repo" />
        <!-- There can be multiple tools depreciating this tool -->
      </depreciatedBy>
      <inBeta asOf="some date">
        Some description why.
      </inBeta>
    </tool>`}</ThemedSyntaxHighlighter>
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
