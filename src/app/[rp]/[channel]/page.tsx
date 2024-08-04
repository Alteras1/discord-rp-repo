import {
  getChannelFromSlugs,
  getRoleplayConfigFromSlug,
} from "~/lib/data-process";

export async function generateStaticParams({
  params,
}: {
  params: { rp: string };
}) {
  const paths = getRoleplayConfigFromSlug(params.rp);
  return paths.channels_ordered.map((path) => ({ channel: path }));
}

export default function RpPage({
  params,
}: {
  params: { rp: string; channel: string };
}) {
  console.log("page", params);
  const channel = getChannelFromSlugs(params.rp, params.channel);
  console.log(channel);
  // console.log(config.channels_ordered);
  return (
    <div>
      {params.channel}
      {channel.map((post, index) => (
        <div key={index}>{post.content}</div>
      ))}
    </div>
  );
}
