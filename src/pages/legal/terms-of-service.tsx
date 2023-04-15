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

const pageName = "Terms of service";

type TermsOfServiceProps = { appProps: AppProps; termsOfServiceHTML: string };

export function TermsOfService({
  appProps,
  termsOfServiceHTML,
}: TermsOfServiceProps): JSX.Element {
  return (
    <Layout
      title={pageName}
      currentPage={pageName}
      appProps={appProps}
      description="Awesome Arcade Extensions's terms of service."
      keywords="Awesome Arcade Extensions, Game development, Awesome, Modules, Libraries, Extensions, Curated, Arcade, Useful, Curated list, MakeCode, Awesome extensions, Useful extensions, MakeCode Arcade, MakeCode Arcade Extensions, Arcade Extensions, Legal, Legal stuff, Terms of service"
      breadCrumbs={[
        { Legal: "/legal" },
        { "Terms of service": "/legal/terms-of-service" },
      ]}
      dontShowServicesWarning
    >
      <div dangerouslySetInnerHTML={{ __html: termsOfServiceHTML }} />
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: TermsOfServiceProps;
}> {
  return {
    props: {
      appProps: await getAppProps(),
      termsOfServiceHTML: await (async () => {
        const p = path.join(process.cwd(), "public", "terms-of-service.md");
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

export default TermsOfService;
