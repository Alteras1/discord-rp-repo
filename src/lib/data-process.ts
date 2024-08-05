import fs from 'fs';
import { sync } from 'glob';
import path from 'path';
import { ConfigJSONSchema, MessageSchema, type User, type ModifiedMessage, type ThreadStarter, isThreadStarter, AttachmentSchema } from './types';
import { z } from 'zod';
import { toSlug } from './utils';

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

  const threadStarters = messages.filter((message) => message.thread?.id) as ThreadStarter[];
  threadStarters.forEach((thread) => {
    const threadMessages = messages.filter((message) => message.channel_id === thread.thread?.id);
    thread.thread_messages = threadMessages;
    thread.thread_slug = toSlug(thread.thread.name);
  });
  const topLevelMessages = messages.filter(
    (message) => !threadStarters.some((t) => t.thread_messages?.includes(message))
      && [0, 18, 19].includes(message.type));

  return topLevelMessages;
}

export function getThreadsFromChannel(rpSlug: string, channelSlug: string) {
  const channel = getChannelFromSlugs(rpSlug, channelSlug);
  return channel.filter(isThreadStarter);
}

export function getThreadFromSlugs(rpSlug: string, channelSlug: string, threadSlug: string) {
  const channel = getChannelFromSlugs(rpSlug, channelSlug);
  return channel.find((message) => isThreadStarter(message) && message.thread_slug === threadSlug) as ThreadStarter;
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
  return `/discord-rp-repo/data/${rpSlug}/avatars/${user.id}/${user.avatar}.${ext}`;
}

export function resolveAttachmentImage(attachment: typeof AttachmentSchema['_output'], rpSlug: string, channelSlug: string) {
  const expectedPath = sync(`${dataPaths}/${rpSlug}/${channelSlug}/${channelSlug}_media/**/*${attachment.filename}*`);

  if (expectedPath.length !== 1) {
    console.error(`Expected 1 file for ${attachment.filename}, got ${expectedPath.length}`);
    return '';
  }
  const path = expectedPath[0]!.replace(dataPaths, '');
  return `/discord-rp-repo/data/${path}`;
}

export function resolveEmojiImage(name: string, id: string, rpSlug: string) {
  const expectedPath = sync(`${dataPaths}/${rpSlug}/**/${name}_${id}*`);

  if (expectedPath.length !== 1) {
    console.error(`Expected 1 file for ${name}, got ${expectedPath.length}`);
    return '';
  }
  const path = expectedPath[0]!.replace(dataPaths, '');
  return `/discord-rp-repo/data/${path}`;
}
