import fs from 'fs';
import { sync } from 'glob';
import path from 'path';
import { ConfigJSONSchema, MessageSchema, User, type ModifiedMessage } from './types';
import { z } from 'zod';
import { StaticImageData } from 'next/image';

const LOCAL_PATH = 'data';

const dataPaths = path.join(process.cwd(), LOCAL_PATH);

export function getRoleplayPaths() {
  const configPaths = sync(`${dataPaths}/*/config.json`);
  return configPaths.map((configPath) => {
    return path.relative(dataPaths, configPath).replace('/config.json', '');
  });
}

export function getRoleplayConfigFromSlug(slug: string) {
  const roleplayPath = path.join(dataPaths, slug);
  const configPath = path.join(roleplayPath, 'config.json');
  const config = ConfigJSONSchema.parse(JSON.parse(fs.readFileSync(configPath, 'utf-8')));
  const channels = sync(`${roleplayPath}/*`, { ignore: ['**/avatars/**', '**/emojis/**', configPath] }).map((channelPath) => {
    return path.relative(roleplayPath, channelPath);
  });
  config.channels_ordered = config.channels_ordered.filter((channel) => channels.includes(channel));
  return {
    ...config,
    channels_ordered: [...(new Set([...config.channels_ordered, ...channels]))],
    slug
  };
}

export function getChannelFromSlugs(rpSlug: string, channelSlug: string) {
  const roleplayPath = path.join(dataPaths, rpSlug);
  const channelPath = path.join(roleplayPath, channelSlug);
  const pages = sync(`${channelPath}/${channelSlug}_*.json`);
  const channelPages = pages.map((page) => {
    return z.array(MessageSchema).parse(JSON.parse(fs.readFileSync(page, 'utf-8')));
  });
  return processChannelMessages(channelPages.flat());
}

function processChannelMessages(messages: ModifiedMessage[]): ModifiedMessage[] {
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const threadStarters = messages.filter((message) => message.thread?.id);
  threadStarters.forEach((thread) => {
    const threadMessages = messages.filter((message) => message.channel_id === thread.thread?.id);
    thread.thread_messages = threadMessages;
  });
  const topLevelMessages = messages.filter((message) => !threadStarters.some((t) => t.thread_messages?.includes(message)));

  return topLevelMessages;
}

/**
 * Function thats only used to help manually create the config.json files without needing to create a whole new node script
 */
export function getAllUsernamesFromAllChannelsInRoleplay(rp: string) {
  const channels = getRoleplayConfigFromSlug(rp).channels_ordered;
  const allMessages = channels.flatMap((channel) => {
    return getChannelFromSlugs(rp, channel);
  });
  return [...new Set(allMessages.map((message) => message.userName))];
}

export function resolveAvatarImage(user: User, rpSlug: string) {
  const expectedPath = sync(`${dataPaths}/${rpSlug}/avatars/${user.id}/${user.avatar}.*`);

  if (expectedPath.length !== 1) {
    console.error(`Expected 1 file for ${user.id}/${user.avatar}, got ${expectedPath.length}`);
    return '';
  }
  const ext = expectedPath[0]!.split('.').pop()!;
  return `https://github.com/Alteras1/discord-rp-repo/blob/main/data/${rpSlug}/avatars/${user.id}/${user.avatar}.${ext}?raw=true`;
}
