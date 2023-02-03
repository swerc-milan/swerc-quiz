import { MessageView } from "components/MessageView/MessageView";

export function PendingFinalRanking({ wide }: { wide?: boolean }) {
  return <MessageView wide={wide}>Are you ready for the results?</MessageView>;
}
