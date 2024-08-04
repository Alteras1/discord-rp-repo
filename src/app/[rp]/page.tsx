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

export default function RpPage({ params }: { params: { rp: string } }) {
  // console.log("page", params);
  const config = getRoleplayConfigFromSlug(params.rp);
  // console.log(config.channels_ordered);
  return <div>{config.name}</div>;
}
