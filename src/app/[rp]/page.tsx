import { getRoleplayConfigFromSlug } from "~/lib/data-process";

export default function RpPage({ params }: { params: { rp: string } }) {
  const config = getRoleplayConfigFromSlug(params.rp);
  return <div>{config.name}</div>;
}
