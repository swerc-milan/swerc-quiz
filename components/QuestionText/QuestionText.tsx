import classNames from "classnames";
import { ErrorView } from "components/ErrorView/ErrorView";
import { ref } from "firebase/database";
import { database } from "lib/firebase";
import { Image } from "lib/types";
import { useObjectVal } from "react-firebase-hooks/database";
import styles from "./QuestionText.module.css";

export function QuestionText({
  text,
  imageId,
  wide,
}: {
  text?: string;
  imageId?: string;
  wide?: boolean;
}) {
  const [image, imageLoading, imageError] = useObjectVal<Image>(
    imageId ? ref(database, `images/${imageId}`) : null
  );
  return (
    <div
      className={classNames({
        [styles.wide]: wide,
        [styles.withImage]: !!imageId,
      })}
    >
      <div className={styles.text}>{text}</div>
      {imageId && (
        <>
          {imageLoading && <div>Loading...</div>}
          {imageError && <ErrorView error={imageError} />}
          {image && (image.kind ?? "img") === "img" && (
            <img src={image.url} className={styles.image} />
          )}
        </>
      )}
    </div>
  );
}
