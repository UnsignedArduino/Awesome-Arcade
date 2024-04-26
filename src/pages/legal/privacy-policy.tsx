import React from "react";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import * as fs from "node:fs/promises";
import path from "path";
import Layout from "../../components/Layout";
import getAppProps, { AppProps } from "../../components/WithAppProps";

const pageName = "Privacy policy";

type PrivacyPolicyProps = { appProps: AppProps; privacyPolicyHTML: string };

export function PrivacyPolicy({
  appProps,
  privacyPolicyHTML,
}: PrivacyPolicyProps): React.ReactNode {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's privacy policy."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Legal, Legal stuff, Privacy policy"
      breadCrumbs={[
        { Legal: "/legal" },
        { "Privacy policy": "/legal/privacy-policy" },
      ]}
    >
      <div dangerouslySetInnerHTML={{ __html: privacyPolicyHTML }} />
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: PrivacyPolicyProps;
}> {
  return {
    props: {
      appProps: await getAppProps(),
      privacyPolicyHTML: await (async () => {
        const p = path.join(process.cwd(), "public", "privacy-policy.md");
        const raw = await fs.readFile(p);
        const processed = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkBreaks)
          .use(remarkMath)
          .use(remarkRehype)
          .use(rehypeKatex)
          .use(rehypeStringify)
          .process(raw);
        return processed.toString();
      })(),
    },
  };
}

export default PrivacyPolicy;
