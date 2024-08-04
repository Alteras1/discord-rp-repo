import Post from "~/components/post";
import {
  getChannelFromSlugs,
  getRoleplayConfigFromSlug,
} from "~/lib/data-process";
import { toTitlecase } from "~/lib/utils";

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
  const channel = getChannelFromSlugs(params.rp, params.channel);
  // console.log(channel);
  // console.log(config.channels_ordered);
  return (
    <div>
      <h1>{toTitlecase(params.channel)}</h1>
      {channel.map((post, index, arr) => (
        <Post message={post} index={index} array={arr} key={index} />
      ))}
    </div>
  );
}
