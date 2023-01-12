export default function HistoryView({ description, time }) {

    return (
        <div className="p-1 border-b border-blue-500">
            <p className="text-slate-400 text-sm">
                <span class="relative inline-flex rounded-full w-2 h-2 bg-red-500 mr-1"></span>
                 {description}
            </p>
            <p className="text-slate-600 text-sm">{time}</p>
        </div>
    )
}