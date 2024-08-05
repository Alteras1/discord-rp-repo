import dynamic from "next/dynamic";
import Link from "next/link";
import Post from "~/components/post";
import {
  getChannelFromSlugs,
  getRoleplayConfigFromSlug,
} from "~/lib/data-process";
import { isThreadStarter, ModifiedMessage } from "~/lib/types";
import { toTitlecase } from "~/lib/utils";

const LocalDateGap = dynamic(() => import("~/components/local-date-gap"), {
  ssr: false,
});

export default function RpPage({
  params,
}: {
  params: { rp: string; channel: string };
}) {
  const channel = getChannelFromSlugs(params.rp, params.channel);
  const user_nicknames = getRoleplayConfigFromSlug(params.rp).user_nicknames;
  // console.log(channel);
  // console.log(config.channels_ordered);

  const threadOrPost = (
    post: ModifiedMessage,
    index: number,
    arr: ModifiedMessage[],
  ) => {
    if (isThreadStarter(post)) {
      return (
        <Link
          className="block"
          href={`/${params.rp}/${params.channel}/${post.thread_slug}`}
          key={index}
        >
          thread: {post.content}
        </Link>
      );
    }
    return (
      <Post
        message={post}
        index={index}
        array={arr}
        key={post.id}
        userNicknameMap={user_nicknames}
        rpSlug={params.rp}
        channelSlug={params.channel}
      />
    );
  };

  return (
    <div>
      <h1 className="text-3xl">{toTitlecase(params.channel)}</h1>
      {channel.map((post, index, arr) =>
        // <LocalDateGap
        //   prevDate={arr[index - 1]?.timestamp}
        //   nextDate={post.timestamp}
        //   key={post.id}
        // />
        threadOrPost(post, index, arr),
      )}
    </div>
  );
}
