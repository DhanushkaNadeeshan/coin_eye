export default function Loading({ message = "Loading" }) {
  return (
    <div className="fixed left-0  top-0 p-24 text-center bg-opacity-80 bg-gray-700   w-screen h-screen z-30">
      <img alt="loader" className="mx-auto w-10" src="/img/loader.svg"></img>
      <p className="text-slate-200 font-bold ">
        {message} <span className="animate-pulse">...</span>
      </p>
    </div>
  );
}
