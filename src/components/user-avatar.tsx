import { type User } from "~/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image, { type StaticImageData } from "next/image";
import { resolveAvatarImage } from "~/lib/data-process";

export default async function UserAvatar({
  user,
  rpSlug,
}: {
  user: User;
  rpSlug: string;
}) {
  const name = user.global_name ?? user.username;
  let fallback = name.match(/[a-zA-Z0-9]/)![0].toUpperCase();
  if (name.split(" ").length > 1) {
    fallback = name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }

  const profilePic = resolveAvatarImage(user, rpSlug);
  return (
    <Avatar>
      <Image src={profilePic} alt={name} width={40} height={40} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
