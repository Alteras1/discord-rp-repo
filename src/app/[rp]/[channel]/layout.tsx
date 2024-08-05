import {
  getRoleplayConfigFromSlug,
  getRoleplayPaths,
} from "~/lib/data-process";

export async function generateStaticParams({
  params,
}: {
  params: { rp: string };
}) {
  const paths = getRoleplayConfigFromSlug(params.rp);
  return paths.channels_ordered.map((path) => ({ channel: path }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
