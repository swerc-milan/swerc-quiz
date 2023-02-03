import { MessageView } from "components/MessageView/MessageView";
import { States } from "lib/types";

export function PendingStart({ state }: { state: States.PendingStart }) {
  return (
    <MessageView>
      <div>
        {state.name ? <strong>{state.name}</strong> : "A new quiz"} will start
        shortly
      </div>
    </MessageView>
  );
}
