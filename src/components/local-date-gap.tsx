"use client";

export default function LocalDateGap({
  prevDate,
  nextDate,
}: {
  prevDate?: Date;
  nextDate: Date;
}) {
  const prev = prevDate?.toLocaleDateString(undefined, { dateStyle: "medium" });
  const next = nextDate.toLocaleDateString(undefined, { dateStyle: "medium" });
  if (prev !== next) {
    return (
      <div className="flex flex-row items-center justify-center">
        <div className="h-0 flex-1 border-t border-muted-foreground/[.3]"></div>
        <div className="px-2 text-center text-sm text-muted-foreground/[.5]">
          {next}
        </div>
        <div className="h-0 flex-1 border-t border-muted-foreground/[.3]"></div>
      </div>
    );
  }
  return <></>;
}
