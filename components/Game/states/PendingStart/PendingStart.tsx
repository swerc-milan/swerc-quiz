import { MessageView } from "components/MessageView/MessageView";
import { States } from "lib/types";

export function PendingStart({
  state,
  wide,
}: {
  state: States.PendingStart;
  wide?: boolean;
}) {
  return (
    <MessageView wide={wide}>
      <div>
        {state.name ? <strong>{state.name}</strong> : "A new quiz"} will start
        shortly
      </div>
    </MessageView>
  );
}
