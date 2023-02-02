import { Question } from "lib/types";

export function QuestionPreview({ question }: { question: Question }) {
  return (
    <div>
      <h3>Question details</h3>
      <p>
        <em>{question.text ?? ""}</em>
      </p>
      {question.topic && (
        <p>
          <strong>Topic</strong>: {question.topic}
        </p>
      )}
      {question.time && (
        <p>
          <strong>Time</strong>: {question.time} seconds
        </p>
      )}
      <p>
        <strong>Answers</strong> ({question.layout ?? "list"} layout):
      </p>
      <ol>
        {(question.answers ?? []).map((answer, index) => (
          <li key={answer.id ?? index}>{answer.text ?? "<missing text>"}</li>
        ))}
      </ol>
    </div>
  );
}
