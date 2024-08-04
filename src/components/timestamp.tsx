"use client";

export default function Timestamp({ timestamp }: { timestamp: Date }) {
  return (
    <time dateTime={timestamp.toLocaleDateString()}>
      {timestamp.toLocaleDateString()}
    </time>
  );
}
