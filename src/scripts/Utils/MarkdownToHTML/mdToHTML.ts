import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import DOMPurify from "isomorphic-dompurify";

export default async function markdownToHTML(md: string): Promise<string> {
  if (!DOMPurify.isSupported) {
    throw new Error("DOMPurify not supported!");
  }
  return DOMPurify.sanitize(
    (
      await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(md)
    ).toString()
  );
}
