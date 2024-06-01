import classNames from "classnames";

export default function Home() {
  return (
    <div
      className={classNames(
        "flex min-h-screen items-center justify-center",
        "text-3xl font-extrabold uppercase text-green-700"
      )}
    >
      Drello Home
    </div>
  );
}
