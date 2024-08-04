"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

export default function NavBar({
  menu,
}: {
  menu: { text: string; href: string }[];
}) {
  const pathname = usePathname();

  const highlightLink = (href: string) => {
    return pathname !== "/" && href.includes(pathname)
      ? "text-foreground"
      : "text-foreground/60";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="md:flex">
          <input
            type="checkbox"
            name="hamburgerToggle"
            id="hamburgerToggle"
            hidden
          />
          <label htmlFor="hamburgerToggle" className="cursor-pointer md:hidden">
            <MenuIcon />
          </label>
          <Link href="/" className="block lg:mr-6">
            Alteras&apos;s Discord RPs
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {menu.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={
                  "transition-colors hover:text-foreground/80 " +
                  highlightLink(item.href)
                }
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
