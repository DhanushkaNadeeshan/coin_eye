export default function NotificationView({ title, description, time }) {

    return (
        <div className="m-2 p-1 border-b border-blue-500">
            <p className="text-slate-300 font-bold text-sm">
                <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500 mr-1"></span>
                {title}
            </p>
            <div className="px-3">
                <p className="font-bold text-slate-400">{description}</p>
                <p className="text-slate-600 text-sm">{time}</p>
            </div>
        </div>
    )
}