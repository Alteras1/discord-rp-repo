"use client";

import Link from "next/link";
import { CornerDownRightIcon, MenuIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { toTitlecase } from "~/lib/utils";

type FullTree = {
  rp: {
    text: string;
    href: string;
  };
  channels: {
    name: string;
    threads: {
      name: string;
      slug: string;
    }[];
  }[];
}[];

export default function NavBar({ fullTree }: { fullTree: FullTree }) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const highlightLink = (href: string) => {
    return params?.rp === href ? "text-foreground" : "text-foreground/60";
  };
  const highlightChannel = (href: string) => {
    return params?.channel === href
      ? "text-foreground"
      : "text-muted-foreground";
  };

  const threadLink = (rp: string, channel: string) => {
    const foundThread = fullTree
      .find((rp) => rp.rp.href === params?.rp)
      ?.channels.find((c) => c.name === channel)
      ?.threads.find((t) => t.slug === params?.thread);
    return foundThread ? (
      <Link
        href={`/${rp}/${channel}/${foundThread.slug}`}
        className="flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm text-foreground hover:underline"
        prefetch={false}
        onClick={() => setOpen(false)}
      >
        <CornerDownRightIcon size={14} /> {foundThread.name}
      </Link>
    ) : (
      <></>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 md:hidden">
                <MenuIcon className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>
                <Link href="/" className="block lg:mr-6">
                  Alteras&apos;s Discord RPs
                </Link>
              </SheetTitle>
              <SheetDescription className="hidden">
                Personal storage of discord RPs
              </SheetDescription>
              {fullTree.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.rp.href}
                    className={
                      "transition-colors hover:text-foreground/80 " +
                      highlightLink(item.rp.href)
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.rp.text}
                  </Link>
                  {params?.rp === item.rp.href &&
                    item.channels.map((channel, index) => (
                      <div key={index}>
                        <Link
                          href={`/${item.rp.href}/${channel.name}`}
                          className={
                            "flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline " +
                            highlightChannel(channel.name)
                          }
                          prefetch={false}
                          onClick={() => setOpen(false)}
                        >
                          {toTitlecase(channel.name)}
                        </Link>
                        {threadLink(item.rp.href, channel.name)}
                      </div>
                    ))}
                </div>
              ))}
              <SheetFooter>
                <ModeToggle />
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <label htmlFor="hamburgerToggle"></label>
          <Link href="/" className="block lg:mr-6">
            Alteras&apos;s Discord RPs
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex lg:gap-6">
            {fullTree.map(({ rp }, index) => (
              <Link
                href={rp.href}
                key={index}
                className={
                  "transition-colors hover:text-foreground/80 " +
                  highlightLink(rp.href)
                }
              >
                {rp.text}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden flex-1 items-center justify-between space-x-2 md:flex md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
