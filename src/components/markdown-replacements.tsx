import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkBreaks from "remark-breaks";

export const MarkdownComponents = {};

export const markdownProps: Omit<MDXRemoteProps, "source"> = {
  options: {
    mdxOptions: {
      remarkPlugins: [remarkBreaks],
      rehypePlugins: [],
    },
  },
  components: MarkdownComponents,
};
