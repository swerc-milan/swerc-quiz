import { MessageView } from "components/MessageView/MessageView";
import { States } from "lib/types";
import Head from "next/head";
import styles from "./NextQuestionSoon.module.css";

export function NextQuestionSoon({
  state,
  wide,
}: {
  state: States.NextQuestionSoon;
  wide?: boolean;
}) {
  const questionName =
    state.index !== undefined
      ? `Question ${state.index + 1}`
      : "The next question";
  const topic = state.topic ? (
    <>
      is about{" "}
      <div>
        <strong>{state.topic}</strong>
      </div>
    </>
  ) : (
    "is about to start"
  );
  return (
    <MessageView wide={wide}>
      {state.imageUrl && (
        <Head>
          <link rel="preload" href={state.imageUrl} as="image" />
        </Head>
      )}
      <div>
        <div>
          {questionName} {topic}
        </div>
        {state.time && <div className={styles.time}>{state.time} seconds</div>}
      </div>
    </MessageView>
  );
}
