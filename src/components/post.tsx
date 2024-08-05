import { type ModifiedMessage } from "~/lib/types";
import Timestamp from "./timestamp";
import { milliSecondsIn7Min } from "~/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { markdownProps } from "~/lib/markdown-process";
import UserAvatar from "./user-avatar";

export default async function Post({
  message,
  index,
  array,
  userNicknameMap,
  rpSlug,
}: {
  message: ModifiedMessage;
  index: number;
  array: ModifiedMessage[];
  userNicknameMap: Record<string, string>;
  rpSlug: string;
}) {
  const timegap =
    message.timestamp.getTime() - (array[index - 1]?.timestamp.getTime() ?? 0);
  const showBreak =
    timegap > milliSecondsIn7Min ||
    message.userName !== array[index - 1]?.userName;

  return (
    <>
      <div
        className="flex items-start gap-2 p-2 pl-0 hover:[&:not(:has([data-post]:hover))]:bg-muted"
        data-post
      >
        <div className="flex w-16 justify-center">
          <UserAvatar user={message.author} rpSlug={rpSlug} />
        </div>
        <div className="flex-1">
          <div>
            {userNicknameMap[message.userName] ??
              message.author.global_name ??
              message.author.username}{" "}
            <Timestamp timestamp={message.timestamp} style="full" />
          </div>
          <div className="prose max-w-full flex-1 break-words dark:prose-invert prose-code:text-wrap prose-hr:my-4">
            <MDXRemote {...markdownProps} source={message.content} />
          </div>
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
              rpSlug={rpSlug}
            />
          ))}
        </div>
      )}
    </>
  );
}
