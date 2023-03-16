export function Alert({ children }) {
  // return just notification only
  return (
    <div
      className="
            fixed 
            bottom-0 
            right-4
            w-96
            px-5 
            py-4 
            rounded-sm
            border-l-4
            border-green-500
            bg-teal-900
            text-slate-200
            slide-top
            z-40
  
            "
    >
      {children}
    </div>
  );
}

export function AlertError({ children }) {
  // return just notification only
  return (
    <div
      className="
            fixed 
            bottom-0 
            right-4
            w-96
            px-5 
            py-4 
            rounded-sm
            border-l-4
            border-red-300
            bg-red-900
            text-slate-200
            slide-top
            z-40
  
            "
    >
      {children}
    </div>
  );
}

export function AlertWarning({ children }) {
  // return just notification only
  return (
    <div
      className="
            fixed 
            bottom-0 
            right-4
            w-96
            px-5 
            py-4 
            rounded-sm
            border-l-4
            border-orange-600
            bg-orange-900
            text-slate-200
            slide-top
            z-40
  
            "
    >
      {children}
    </div>
  );
}

export default Alert;
