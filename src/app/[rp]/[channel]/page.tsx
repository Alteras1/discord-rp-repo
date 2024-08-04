import dynamic from "next/dynamic";
import Post from "~/components/post";
import {
  getChannelFromSlugs,
  getRoleplayConfigFromSlug,
} from "~/lib/data-process";
import { toTitlecase } from "~/lib/utils";

const LocalDateGap = dynamic(() => import("~/components/local-date-gap"), {
  ssr: false,
});

export async function generateStaticParams({
  params,
}: {
  params: { rp: string };
}) {
  const paths = getRoleplayConfigFromSlug(params.rp);
  return paths.channels_ordered.map((path) => ({ channel: path }));
}

export default function RpPage({
  params,
}: {
  params: { rp: string; channel: string };
}) {
  const channel = getChannelFromSlugs(params.rp, params.channel);
  const user_nicknames = getRoleplayConfigFromSlug(params.rp).user_nicknames;
  // console.log(channel);
  // console.log(config.channels_ordered);
  return (
    <div>
      <h1 className="text-3xl">{toTitlecase(params.channel)}</h1>
      {channel.map((post, index, arr) => (
        <>
          <LocalDateGap
            prevDate={arr[index - 1]?.timestamp}
            nextDate={post.timestamp}
            key={index}
          />
          <Post
            message={post}
            index={index}
            array={arr}
            key={index}
            userNicknameMap={user_nicknames}
          />
        </>
      ))}
    </div>
  );
}
