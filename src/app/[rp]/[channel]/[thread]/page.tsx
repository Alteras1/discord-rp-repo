import Post from "~/components/post";
import {
  getRoleplayConfigFromSlug,
  getThreadFromSlugs,
  getThreadsFromChannel,
} from "~/lib/data-process";

export async function generateStaticParams({
  params,
}: {
  params: { rp: string; channel: string };
}) {
  const threads = getThreadsFromChannel(params.rp, params.channel);
  return threads.map((thread) => ({ thread: thread.thread_slug }));
}

export default function ThreadPage({
  params,
}: {
  params: { rp: string; channel: string; thread: string };
}) {
  const thread = getThreadFromSlugs(params.rp, params.channel, params.thread);
  const user_nicknames = getRoleplayConfigFromSlug(params.rp).user_nicknames;

  console.log(thread);
  return (
    <div>
      <h1 className="text-3xl">{thread.thread.name}</h1>
      {thread.thread_messages.map((post, index, arr) => (
        <Post
          message={post}
          index={index}
          array={arr}
          key={post.id}
          userNicknameMap={user_nicknames}
          rpSlug={params.rp}
          channelSlug={params.channel}
        />
      ))}
    </div>
  );
}
