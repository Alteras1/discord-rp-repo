import { type ModifiedMessage } from "~/lib/types";
import Timestamp from "./timestamp";
import { milliSecondsIn7Min } from "~/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { markdownProps } from "./markdown-replacements";

export default async function Post({
  message,
  index,
  array,
  userNicknameMap,
}: {
  message: ModifiedMessage;
  index: number;
  array: ModifiedMessage[];
  userNicknameMap: Record<string, string>;
}) {
  const timegap =
    message.timestamp.getTime() - (array[index - 1]?.timestamp.getTime() ?? 0);
  const showBreak =
    timegap > milliSecondsIn7Min ||
    message.userName !== array[index - 1]?.userName;

  return (
    <>
      <div
        className="hover:[&:not(:has([data-post]:hover))]:bg-muted"
        data-post
      >
        {userNicknameMap[message.userName] ??
          message.author.global_name ??
          message.author.username}{" "}
        <Timestamp timestamp={message.timestamp} style="full" />
        <div className="prose max-w-[80ch] break-words dark:prose-invert prose-code:text-wrap">
          <MDXRemote {...markdownProps} source={message.content} />
        </div>
      </div>
      {message.thread_messages && (
        <div className="border-l-2 p-4">
          {message.thread_messages.map((threadMessage, index) => (
            <Post
              message={threadMessage}
              index={index}
              array={message.thread_messages!}
              userNicknameMap={userNicknameMap}
              key={threadMessage.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
