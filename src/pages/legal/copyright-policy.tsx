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

const pageName = "Copyright policy";

type CopyrightPolicyProps = { appProps: AppProps; copyrightPolicyHTML: string };

export function CopyrightPolicy({
  appProps,
  copyrightPolicyHTML,
}: CopyrightPolicyProps): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade's copyright policy."
      keywords="Awesome Arcade, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Legal, Legal stuff, Copyright policy"
      breadCrumbs={[
        { Legal: "/legal" },
        { "Copyright policy": "/legal/copyright-policy" },
      ]}
    >
      <div dangerouslySetInnerHTML={{ __html: copyrightPolicyHTML }} />
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: CopyrightPolicyProps;
}> {
  return {
    props: {
      appProps: await getAppProps(),
      copyrightPolicyHTML: await (async () => {
        const p = path.join(process.cwd(), "public", "copyright-policy.md");
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
        const result = processed.toString();
        return result;
      })(),
    },
  };
}

export default CopyrightPolicy;
