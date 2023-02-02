import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { Question, Image } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";

export function QuestionPreview({ question }: { question: Question }) {
  const [image, imageLoading, imageError] = useObjectVal<Image>(
    question.imageId ? ref(database, `images/${question.imageId}`) : null
  );
  return (
    <div>
      <h3>Question details</h3>
      <p>
        <em>{question.text ?? ""}</em>
      </p>
      {question.imageId && (
        <>
          {imageLoading && <div>Loading...</div>}
          {imageError && <ErrorView error={imageError} />}
          {image && (image.kind ?? "img") === "img" && <img src={image.url} />}
        </>
      )}
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
