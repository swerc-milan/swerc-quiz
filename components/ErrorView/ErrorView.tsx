export function ErrorView({ error }: { error: string | Error }) {
  return (
    <p>
      <strong>Error</strong>: {error.toString()}
    </p>
  );
}
