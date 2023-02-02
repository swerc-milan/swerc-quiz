import { MessageView } from "components/MessageView/MessageView";
import { States } from "lib/types";

export function PendingFinalRanking({
  uid,
  state,
}: {
  uid: string;
  state: States.PendingFinalRanking;
}) {
  return <MessageView>Are you ready for the results?</MessageView>;
}
