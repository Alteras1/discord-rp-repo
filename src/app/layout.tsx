import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import { Atkinson_Hyperlegible, Literata } from "next/font/google";
import NavBar from "~/components/nav-bar";
import {
  getRoleplayConfigFromSlug,
  getRoleplayPaths,
  getRoleplayTree,
} from "~/lib/data-process";

export const metadata: Metadata = {
  title: "Alteras's Discord RPs",
  description: "Personal storage of discord RPs ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const hyperledgible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const literata = Literata({
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

function getAllRoleplays(): { text: string; href: string }[] {
  const roleplays = getRoleplayPaths();
  return roleplays.map((rp) => {
    const config = getRoleplayConfigFromSlug(rp);
    return {
      text: config.name,
      href: `${rp}`,
    };
  });
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const roleplays = getAllRoleplays();
  const fullTree = roleplays.map((rp) => ({
    rp: rp,
    channels: getRoleplayTree(rp.href),
  }));
  return (
    <html
      lang="en"
      className={literata.className + " scroll-pt-14 scroll-smooth"}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <NavBar fullTree={fullTree} />
          {children}
          <footer className="mt-4 h-8 w-full border-t-2 text-sm">
            by Alteras
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
