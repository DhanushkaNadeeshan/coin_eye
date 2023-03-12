export default function NotificationView({ data, markAsRead }) {
  const { createdAt, description, read, type, _id } = data;
  const localTime = new Date(createdAt).toLocaleString();
  if (read) {
    return (
      <div className="m-2 p-2  border-b border-blue-500">
        <p className="text-slate-300 font-bold text-sm">
          <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500 mr-1"></span>
          {type}
        </p>
        <div className="px-3">
          <p className="font-bold text-slate-400">{description}</p>
          <p className="text-slate-600 text-sm">{localTime}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="m-2 p-2 bg-slate-800 hover:cursor-pointer rounded border-b border-blue-500"
        onClick={() => markAsRead(_id)}
      >
        <p className="text-slate-300 font-bold text-sm">
          <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500 mr-1"></span>
          {type}
        </p>
        <div className="px-3">
          <p className=" text-slate-600">{description}</p>
          <p className="text-slate-600 text-sm">{createdAt}</p>
        </div>
      </div>
    );
  }
}
