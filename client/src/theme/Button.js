export default function Button({
  onClick,
  children,
  width = "w-full",
  type = "button",
}) {
  let color = "";

  switch (type) {
    case "warning":
      color = "border-orange-500 hover:bg-orange-700 bg-orange-900";
      break;
    case "error":
      color = "border-red-500 hover:bg-red-700 bg-red-900";
      break;

    default:
      color = "border-blue-500 hover:bg-blue-600 bg-blue-900";
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
            ${width}
            ${color}
            py-1 
            border  
            opacity-75 
            rounded-full 
            font-bold 
            text-stone-50 
            `}
    >
      {children}
    </button>
  );
}
