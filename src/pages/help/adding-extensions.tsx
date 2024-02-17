import React from "react";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";
import Link from "next/link";
import CopyingExtensionURLImage from "@/assets/images/help/adding-extensions/copying-riknoll-arcade-mini-menu-url.png";
import ExtensionButtonInToolboxImage from "@/assets/images/help/adding-extensions/extension-button-in-toolbox-hover.png";
import ExtensionURLInputImage from "@/assets/images/help/adding-extensions/extension-url-input.png";
import ExtensionCardImage from "@/assets/images/help/adding-extensions/riknoll-arcade-mini-menu-extension-card.png";
import ExtensionToolboxImage from "@/assets/images/help/adding-extensions/riknoll-arcade-mini-menu-toolbox.png";
import ClickableFigure from "@/components/Figure/ClickableFigure";

const pageName = "Adding extensions";

export function AddingExtensions({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="A guide on how to add extensions to MakeCode Arcade."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Help, Adding extensions, Add extensions, Add extension, Extensions, Extension, Add, Adding, Guide, How to, How to add extensions, MakeCode Arcade extensions, MakeCode Arcade extension, MakeCode Arcade extension guide, MakeCode Arcade extensions guide, MakeCode Arcade add extensions, MakeCode Arcade add extension, MakeCode Arcade add extension guide, MakeCode Arcade add extensions guide"
      breadCrumbs={[
        { Help: "/help" },
        { "Adding extensions": "/help/adding-extensions" },
      ]}
    >
      <h1>{pageName}</h1>
      <p>This is a guide on how to add extensions to MakeCode Arcade!</p>
      <ol>
        <li>
          <div>
            <p>Get the URL for your extension.</p>
            <p>
              Typically a link to a GitHub repository, you can find these links
              anywhere by running a Google search, looking through the{" "}
              <a
                href="https://forum.makecode.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MakeCode Forums
              </a>
              , or obviously by taking a look at our curated list of{" "}
              <Link href="/extensions">extensions</Link>. 😄
            </p>
            <ClickableFigure
              src={CopyingExtensionURLImage}
              id="CopyingExtensionURLImage"
              alt="A picture of riknoll's arcade-mini-menu extension in the card on the Awesome Arcade extensions page."
              caption={
                <>
                  You can browser Awesome Arcade{"'"}s curated list of{" "}
                  <Link href="/extensions">extensions</Link> and click on the
                  extension{"'"}s URL you want! (It gets copied to your
                  clipboard.)
                </>
              }
            />
          </div>
        </li>
        <li>
          <div>
            <p>
              Open the extensions page in your MakeCode Arcade project by
              clicking the {'"'}Extensions{'"'} button in the toolbox.
            </p>
            <ClickableFigure
              src={ExtensionButtonInToolboxImage}
              id="ExtensionButtonInToolboxImage"
              alt={`A picture of the "Extensions" button in the MakeCode Arcade toolbox.`}
              caption={
                <>
                  This is the {'"'}Extensions{'"'} button in the toolbox!
                </>
              }
            />
          </div>
        </li>
        <li>
          <div>
            <p>
              Paste the URL into the text box that says{" "}
              <code>Search or enter project URL...</code> and press{" "}
              <kbd>Enter</kbd>.
            </p>
            <ClickableFigure
              src={ExtensionURLInputImage}
              id="ExtensionURLInputImage"
              alt="A picture of the extension URL input in the extensions page in MakeCode Arcade."
              caption="This is the extensions URL input where you should paste the extension URL into."
            />
          </div>
        </li>
        <li>
          <div>
            <p>Click on the card to install the extension!</p>
            <ClickableFigure
              src={ExtensionCardImage}
              id="ExtensionCardImage"
              alt="A picture of the extension card for the riknoll/arcade-mini-menu extension in the extensions page in MakeCode Arcade."
              caption={
                <>
                  This is the extension card for the{" "}
                  <code>riknoll/arcade-mini-menu</code> extension! Click on it
                  to install the extension.
                </>
              }
            />
          </div>
        </li>
        <li>
          <div>
            <p>
              That{"'"}s it! You{"'"}ve added an extension to your MakeCode
              Arcade project! 🎉
            </p>
            <ClickableFigure
              src={ExtensionToolboxImage}
              id="ExtensionToolboxImage"
              alt="A picture of the toolbox open for the extension riknoll/arcade-mini-menu in MakeCode Arcade."
              caption="Your extension has been added! Usually new blocks or new sections will be added to the toolbox, allowing you to start using them right away!"
            />
          </div>
        </li>
      </ol>
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

export default AddingExtensions;
