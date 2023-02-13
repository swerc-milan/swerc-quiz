import classNames from "classnames";
import { TextWithNewLines } from "components/TextWithNewLines/TextWithNewLines";
import styles from "./QuestionText.module.css";

export function QuestionText({
  text,
  imageUrl,
  wide,
}: {
  text?: string;
  imageUrl?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={classNames({
        [styles.wide]: wide,
        [styles.withImage]: !!imageUrl,
      })}
    >
      <div className={styles.text}>
        <TextWithNewLines text={text ?? ""} />
      </div>
      {imageUrl && <img src={imageUrl} className={styles.image} />}
    </div>
  );
}
