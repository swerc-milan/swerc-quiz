import React from "react";

export function TextWithNewLines({ text }: { text: string }) {
  const lines = text.split("\n") ?? [];
  return (
    <>
      {lines.map((line, index) => {
        if (index === 0) return line;
        return (
          <React.Fragment key={index}>
            <br />
            {line}
          </React.Fragment>
        );
      })}
    </>
  );
}
