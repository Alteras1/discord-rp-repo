import Link from "next/link";
import { type ConfigJSON } from "~/lib/types";

const toTitlecase = (str: string) =>
  str.replace(/\b(\w)/g, (k) => k.toUpperCase());

export default function RpNav({
  rpSlug,
  config,
}: {
  rpSlug: string;
  config: ConfigJSON;
}) {
  // console.log(config);
  return (
    <aside className="flex flex-col">
      sidebar
      {config.channels_ordered.map((channel, index) => (
        <Link href={`/${rpSlug}/${channel}`} key={index}>
          {toTitlecase(channel.replaceAll("-", " "))}
        </Link>
      ))}
    </aside>
  );
}
