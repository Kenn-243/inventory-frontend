export default function loading(isLoading: boolean) {
  return (
    <div
      className={`${
        isLoading ? "block" : "hidden"
      } inset-0 bg-base-300 bg-opacity-50 z-10 pointer-events-auto flex justify-center w-screen h-screen align-center absolute`}
    >
      <span className={"loading loading-dots loading-lg z-10"}></span>
    </div>
  );
}
