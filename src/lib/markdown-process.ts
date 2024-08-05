import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkBreaks from "remark-breaks";
import { remarkAutoLinkLiteral } from './auto-link-literal';

export const MarkdownComponents = {};

export const markdownProps: Omit<MDXRemoteProps, "source"> = {
  options: {
    mdxOptions: {
      remarkPlugins: [remarkAutoLinkLiteral, remarkBreaks],
      rehypePlugins: [],
    },
  },
  components: MarkdownComponents,
};

