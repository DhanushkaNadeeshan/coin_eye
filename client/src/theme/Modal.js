export default function Modal({ children, title, action, closeHandle }) {

    if (action) {
        return (
            <div className="fixed left-0 top-0  bg-white/10  w-screen h-screen z-30 ">
                <div className="p-4  float-right w-2/6  bg-slate-700 h-screen overflow-y-scroll slide-left">
                    <button className="font-bold text-red-300" onClick={closeHandle}>Close</button>
                    <p className="font-bold text-center text-xl text-blue-400">{title}</p>
                    {children}
                </div>
            </div>)

    }
}