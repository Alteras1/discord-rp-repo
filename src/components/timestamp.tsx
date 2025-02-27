"use client";

import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function Timestamp({
  timestamp,
  style,
}: {
  timestamp: Date;
  style: "full" | "short";
}) {
  const [time, setTime] = useState(timestamp.toLocaleTimeString());
  const [shortDate, setShortDate] = useState(timestamp.toUTCString());
  const [fullDate, setFullDate] = useState(timestamp.toUTCString());

  useEffect(() => {
    const datestring = timestamp.toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const fullDatestring = timestamp.toLocaleDateString(undefined, {
      dateStyle: "full",
    });
    const timestring = timestamp.toLocaleTimeString(undefined, {
      timeStyle: "short",
    });
    setTime(timestring);
    setShortDate(`${datestring} ${timestring}`);
    setFullDate(`${fullDatestring} ${timestring}`);
  }, [timestamp]);

  return (
    <HoverCard>
      <HoverCardTrigger>
        <time
          dateTime={timestamp.toUTCString()}
          className="pointer-events-none text-xs text-muted-foreground"
        >
          {style === "full" ? shortDate : time}
        </time>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-1 text-sm" side="top">
        {fullDate}
      </HoverCardContent>
    </HoverCard>
  );
}
