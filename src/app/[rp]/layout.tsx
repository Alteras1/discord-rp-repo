import RpNav from "~/components/rp-nav";
import {
  getRoleplayConfigFromSlug,
  getRoleplayPaths,
} from "~/lib/data-process";

export async function generateStaticParams() {
  const paths = getRoleplayPaths();
  return paths.map((path) => {
    return {
      rp: path,
    };
  });
}

export default function Layout({
  params,
  children,
}: {
  params: { rp: string };
  children: React.ReactNode;
}) {
  const config = getRoleplayConfigFromSlug(params.rp);
  return (
    <main className="container min-h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <RpNav rpSlug={params.rp} config={config} />
      {children}
    </main>
  );
}
