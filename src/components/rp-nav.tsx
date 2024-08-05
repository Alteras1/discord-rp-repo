"use client";

import { CornerDownRightIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ConfigJSON } from "~/lib/types";
import { toTitlecase } from "~/lib/utils";

export default function RpNav({
  rpSlug,
  config,
  tree,
}: {
  rpSlug: string;
  config: ConfigJSON;
  tree: { name: string; threads: { name: string; slug: string }[] }[];
}) {
  const urlParams = useParams();
  const highlightChannel = (href: string) => {
    return urlParams?.channel === href
      ? "text-foreground"
      : "text-muted-foreground";
  };

  const threadLink = (channel: string) => {
    if (!urlParams?.thread) {
      return <></>;
    }
    const foundThread = tree
      .find((c) => c.name === channel)
      ?.threads.find((t) => t.slug === urlParams?.thread);
    return foundThread ? (
      <Link
        href={`/${rpSlug}/${channel}/${foundThread.slug}`}
        className="flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm text-foreground hover:underline"
      >
        <CornerDownRightIcon size={14} /> {foundThread.name}
      </Link>
    ) : (
      <></>
    );
  };

  return (
    <aside className="sticky top-14 hidden flex-col md:flex">
      <Link
        href={`/${rpSlug}`}
        className="mb-1 rounded-md px-2 py-1 font-semibold"
      >
        {config.name}
      </Link>
      {config.channels_ordered.map((channel, index) => (
        <div key={index}>
          <Link
            href={`/${rpSlug}/${channel}`}
            key={index}
            className={
              "flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline " +
              highlightChannel(channel)
            }
          >
            {toTitlecase(channel)}
          </Link>
          {threadLink(channel)}
        </div>
      ))}
    </aside>
  );
}
