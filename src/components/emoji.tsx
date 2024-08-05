import Image from "next/image";
import React from "react";
import { resolveEmojiImage } from "~/lib/data-process";
import { type ReactionSchema } from "~/lib/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function Emoji({
  reaction,
  rpSlug,
}: {
  reaction: (typeof ReactionSchema)["_output"];
  rpSlug: string;
}) {
  // Unicode emoji
  let image: React.ReactNode = (
    <span className="block size-4 text-base leading-none">
      {reaction.emoji.name}
    </span>
  );
  let bigImage: React.ReactNode = (
    <span className="block size-12 text-5xl leading-none">
      {reaction.emoji.name}
    </span>
  );
  let name = "";
  if (reaction.emoji.id) {
    // Custom emoji
    const src = resolveEmojiImage(
      reaction.emoji.name,
      reaction.emoji.id,
      rpSlug,
    );
    name = ":" + reaction.emoji.name + ":";
    image = (
      <Image
        src={src}
        width={16}
        height={16}
        alt={reaction.emoji.name}
        className="size-4"
      />
    );
    bigImage = (
      <Image
        src={src}
        width={48}
        height={48}
        alt={reaction.emoji.name}
        className="size-12"
      />
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="inline-flex items-center gap-1 rounded-lg border border-input bg-secondary/80 p-1 px-2 text-sm text-secondary-foreground">
          {image} {reaction.count}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="inline-flex items-center gap-1 text-sm"
      >
        {bigImage} {name} reacted by {reaction.count}{" "}
        {reaction.count > 1 ? "people" : "person"}
      </HoverCardContent>
    </HoverCard>
  );
}
