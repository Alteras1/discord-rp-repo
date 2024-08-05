import { type Message } from "~/lib/types";
import Timestamp from "./timestamp";
import { milliSecondsIn7Min } from "~/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { markdownProps } from "~/lib/markdown-process";
import UserAvatar from "./user-avatar";
import { resolveAttachmentImage } from "~/lib/data-process";
import Image from "next/image";
import Emoji from "./emoji";

export default async function Post({
  message,
  index,
  array,
  userNicknameMap,
  rpSlug,
  channelSlug,
}: {
  message: Message;
  index: number;
  array: Message[];
  userNicknameMap: Record<string, string>;
  rpSlug: string;
  channelSlug: string;
}) {
  const timegap =
    message.timestamp.getTime() - (array[index - 1]?.timestamp.getTime() ?? 0);
  const showBreak =
    timegap > milliSecondsIn7Min ||
    message.userName !== array[index - 1]?.userName;

  const displayAttachments = message.attachments.map((attachment, idx) => {
    const path = resolveAttachmentImage(attachment, rpSlug, channelSlug);
    return (
      <Image
        src={path}
        width={attachment.width}
        height={attachment.height}
        alt={attachment.placeholder ?? ""}
        key={idx}
        className="rounded"
      />
    );
  });

  return (
    <>
      <div
        className="group flex items-start p-2 pl-0 transition-[background-color] delay-0 duration-300 hover:bg-muted hover:delay-500"
        data-post
        id={message.id}
      >
        <div className="flex w-16 justify-center">
          {showBreak && <UserAvatar user={message.author} rpSlug={rpSlug} />}
          {!showBreak && (
            <div className="opacity-0 transition delay-0 duration-300 group-hover:opacity-100 group-hover:delay-500">
              <Timestamp timestamp={message.timestamp} style="short" />
            </div>
          )}
        </div>
        <div className="min-h-4 flex-1">
          {showBreak && (
            <div className="leading-none">
              {userNicknameMap[message.userName] ??
                message.author.global_name ??
                message.author.username}{" "}
              <Timestamp timestamp={message.timestamp} style="full" />
            </div>
          )}
          <div className="prose max-w-full flex-1 break-words dark:prose-invert prose-code:text-wrap prose-hr:my-4">
            <MDXRemote {...markdownProps} source={message.content} />
          </div>
          {displayAttachments}
          {message.reactions && (
            <div className="mt-2 flex gap-1">
              {message.reactions.map((reaction, idx) => (
                <Emoji reaction={reaction} rpSlug={rpSlug} key={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
