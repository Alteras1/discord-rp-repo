import { z } from 'zod';

export const ConfigJSONSchema = z.object({
  name: z.string(),
  description: z.string(),
  channels_ordered: z.string().array(),
  user_nicknames: z.record(z.string(), z.string()),
});

export type ConfigJSON = typeof ConfigJSONSchema['_output'];

// Raw Discord types from Discrub

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  discriminator: z.string(),
  public_flags: z.number(),
  flags: z.number(),
  banner: z.string().nullable(),
  accent_color: z.string().nullable(),
  global_name: z.string().nullable(),
  avatar_decoration_data: z.string().nullable(),
  banner_color: z.string().nullable(),
  clan: z.string().nullable()
});

export const AttachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  size: z.number(),
  url: z.string(),
  proxy_url: z.string(),
  width: z.number(),
  height: z.number(),
  content_type: z.string(),
  content_scan_version: z.number().optional(),
  placeholder: z.string().optional(),
  placeholder_version: z.number().optional()
});

export const AuthorOrProviderSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
});

export const ThumbnailSchema = z.object({
  url: z.string(),
  proxy_url: z.string(),
  width: z.number(),
  height: z.number(),
  placeholder: z.string().optional(),
  placeholder_version: z.number().optional()
});

export const VideoSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  placeholder: z.string().optional(),
  placeholder_version: z.number().optional()
});

export const MessageReferenceSchema = z.object({
  type: z.number(),
  channel_id: z.string(),
  guild_id: z.string().optional(),
});

export const ThreadMetadataSchema = z.object({
  archived: z.boolean(),
  archive_timestamp: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
  auto_archive_duration: z.number(),
  locked: z.boolean(),
  create_timestamp: z.string().datetime({ offset: true }).pipe(z.coerce.date())
});

export const EmojiSchema = z.object({
  id: z.string().nullable(),
  name: z.string(),
  animated: z.boolean().optional()
});

export const CountDetailsSchema = z.object({
  burst: z.number(),
  normal: z.number()
});

export const EmbedSchema = z.object({
  type: z.string(),
  url: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  color: z.number().optional(),
  author: AuthorOrProviderSchema.optional(),
  provider: AuthorOrProviderSchema.optional(),
  thumbnail: ThumbnailSchema.optional(),
  video: VideoSchema.optional(),
  content_scan_version: z.number().optional(),
});

export const ThreadSchema = z.object({
  id: z.string(),
  type: z.number(),
  last_message_id: z.string(),
  flags: z.number(),
  guild_id: z.string(),
  name: z.string(),
  parent_id: z.string(),
  rate_limit_per_user: z.number(),
  bitrate: z.number(),
  user_limit: z.number(),
  rtc_region: z.string().nullable(),
  owner_id: z.string(),
  thread_metadata: ThreadMetadataSchema,
  message_count: z.number(),
  member_count: z.number(),
  total_message_sent: z.number(),
  member_ids_preview: z.array(z.string()).optional()
});

export const ReactionSchema = z.object({
  emoji: EmojiSchema,
  count: z.number(),
  count_details: CountDetailsSchema,
  burst_colors: z.array(z.unknown()).optional(),
  me_burst: z.boolean(),
  burst_me: z.boolean(),
  me: z.boolean(),
  burst_count: z.number()
});

export const MessageSchema = z.object({
  id: z.string(),
  channel_id: z.string(),
  author: UserSchema,
  content: z.string(),
  timestamp: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
  edited_timestamp: z.string().datetime({ offset: true }).pipe(z.coerce.date()).nullable(),
  tts: z.boolean(),
  mention_everyone: z.boolean(),
  mentions: z.array(UserSchema),
  attachments: z.array(AttachmentSchema),
  embeds: z.array(EmbedSchema),
  pinned: z.boolean(),
  type: z.number(),
  message_reference: MessageReferenceSchema.optional(),
  flags: z.number(),
  thread: ThreadSchema.optional(),
  components: z.array(z.unknown()),
  position: z.number().optional(),
  userName: z.string(),
  reactions: z.array(ReactionSchema).optional()
});

export type User = typeof UserSchema['_output'];

export type Message = typeof MessageSchema['_output'];

export type ThreadStarter = Message & {
  thread: typeof ThreadSchema['_output'];
  thread_messages: Message[];
  thread_slug: string;
};

export const isThreadStarter = (message: ModifiedMessage): message is ThreadStarter => {
  return (message as ThreadStarter).thread !== undefined;
};

export type ModifiedMessage = Message | ThreadStarter;
