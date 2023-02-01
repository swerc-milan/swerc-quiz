import { MessageView } from "components/MessageView/MessageView";
import { States } from "lib/types";

export function NoGame({ uid, state }: { uid: string; state: States.NoGame }) {
  return <MessageView>Stay tuned for the next quiz!</MessageView>;
}
