import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import { Atkinson_Hyperlegible } from "next/font/google";
import NavBar from "~/components/nav-bar";
import {
  getRoleplayConfigFromSlug,
  getRoleplayPaths,
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

function getAllRoleplays(): { text: string; href: string }[] {
  const roleplays = getRoleplayPaths();
  return roleplays.map((rp) => {
    const config = getRoleplayConfigFromSlug(rp);
    return {
      text: config.name,
      href: `/${rp}`,
    };
  });
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const roleplays = getAllRoleplays();
  return (
    <html lang="en" className={hyperledgible.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <NavBar menu={roleplays} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
