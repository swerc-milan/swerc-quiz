import { MessageView } from "components/MessageView/MessageView";

export function NoGame({ wide }: { wide?: boolean }) {
  return <MessageView wide={wide}>Stay tuned for the next quiz!</MessageView>;
}
