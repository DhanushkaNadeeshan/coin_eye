export default function Main({ name, children }) {

    return (<>
        <p className="py-2 my-2 text-xl font-bold text-rose-200 border-b-2 border-red-500">{name}</p>
        {children}
    </>)
}