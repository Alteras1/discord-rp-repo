import { getRoleplayConfigFromSlug } from "~/lib/data-process";

export default function RpPage({ params }: { params: { rp: string } }) {
  // console.log("page", params);
  const config = getRoleplayConfigFromSlug(params.rp);
  // console.log(config.channels_ordered);
  return <div>{config.name}</div>;
}
