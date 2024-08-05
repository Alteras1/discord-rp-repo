"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ConfigJSON } from "~/lib/types";
import { toTitlecase } from "~/lib/utils";

export default function RpNav({
  rpSlug,
  config,
}: {
  rpSlug: string;
  config: ConfigJSON;
}) {
  const pathname = usePathname();
  const highlightLink = (href: string) => {
    return pathname.includes(href)
      ? "text-foreground"
      : "text-muted-foreground";
  };
  return (
    <aside className="sticky top-14 flex flex-col">
      <Link
        href={`/${rpSlug}`}
        className="mb-1 rounded-md px-2 py-1 font-semibold"
      >
        {config.name}
      </Link>
      {config.channels_ordered.map((channel, index) => (
        <Link
          href={`/${rpSlug}/${channel}`}
          key={index}
          className={
            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline " +
            highlightLink(channel)
          }
        >
          {toTitlecase(channel)}
        </Link>
      ))}
    </aside>
  );
}
