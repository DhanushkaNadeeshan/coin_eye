export default function GoogleButton({
  onClick,
  children,
  width = "w-full",
  customeCss,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
            ${customeCss}
            ${width}
            py-1 
            border  
            opacity-75 
            rounded-full 
            font-bold 
            text-stone-50 
            flex
            justify-center
            items-center
            hover:bg-blue-100
            hover:text-slate-700
            hover:border-sky-300
            `}
    >
      <img src="/img/google.png" alt="google" className="w-8"></img>
      {children}
    </button>
  );
}
