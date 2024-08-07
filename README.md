# Discord RP Repo for Alteras

An export and cold storage of Discord RPs I've been part of. This is designed to display a static webpage of discord messages with an additional curated selection of plotlines

## General Overview

This is primarily designed as storage of Discord RPs I've been part of, so the format will mostly match what you'd expect from Discord.

Files are exported from Discord via the Discrub Extension, with light changes and modifications to improve folder structure and cohesiveness. Each RP has a custom config.json. The data folder is symlinked to the public folder to allow Nextjs to pull static media directly from there without needing external scripts to copy over files. This might bloat the final build size with all the extra JSON files, but considering this is to bring in static media over remote media, this is acceptable.

## Technology

This is a static site built using Next.js. Heavy usage of Tailwindcss and next-mdx-remote, with components styled from shadcn/ui. Other packages include:

- zod
- next-themes
- remark-breaks
- gfm autolink literal (micromark and mdast extensions)
