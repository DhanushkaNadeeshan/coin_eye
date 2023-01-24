export default function ManuItem({ url, children }) {
  // get path name from url
  const active = url ? "text-neutral-200" : "text-stone-400";

  return (
    <div className={`flex w-full font-bold my-2 ${active}`}>{children}</div>
  );
}
