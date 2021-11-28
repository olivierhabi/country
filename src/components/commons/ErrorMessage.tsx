import clsx from "clsx";

export function ErrorMessage({ message }: { message: string }): JSX.Element {
  return (
    <span className={clsx("block text-xs ml-1 text-red-500", "errorDisplay")}>
      {message}
    </span>
  );
}
