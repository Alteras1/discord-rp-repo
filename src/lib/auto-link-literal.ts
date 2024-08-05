/// <reference types="remark-parse" />

import type { Processor } from "unified";
import { gfmAutolinkLiteralFromMarkdown } from 'mdast-util-gfm-autolink-literal';
import { gfmAutolinkLiteral } from 'micromark-extension-gfm-autolink-literal';

/**
 * This is a remark plugin that automatically links any literal URLs in the markdown.
 * Based on https://github.com/syntax-tree/mdast-util-gfm-autolink-literal and https://github.com/micromark/micromark-extension-gfm-autolink-literal
 * with code simplified from https://github.com/remarkjs/remark-gfm dependencies.
 * 
 * This only exists so that I can use it without having to adopt the entire remark-gfm plugin and GitHub Flavored Markdown.
 *
 * @returns Nothing.
 */
export function remarkAutoLinkLiteral(): void {
  // @ts-expect-error: TS is wrong about `this`.
  const self = /** @type {Processor} */ (this) as Processor;
  const data = self.data();

  const micromarkExtensions =
    data.micromarkExtensions ?? (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions ?? (data.fromMarkdownExtensions = []);

  micromarkExtensions.push(gfmAutolinkLiteral());
  fromMarkdownExtensions.push(gfmAutolinkLiteralFromMarkdown());
}
