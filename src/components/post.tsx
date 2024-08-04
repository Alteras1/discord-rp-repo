import { type ModifiedMessage } from "~/lib/types";
import Timestamp from "./timestamp";

export default function Post({
  message,
}: {
  message: ModifiedMessage;
  index: number;
  array: ModifiedMessage[];
}) {
  return (
    <div>
      <Timestamp timestamp={message.timestamp} />
      {message.content}
    </div>
  );
}
