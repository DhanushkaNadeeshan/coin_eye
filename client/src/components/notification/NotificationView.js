import axios from "axios";
import { markAsRead } from "../../utils/slice/notificationSlice";
import { useDispatch } from "react-redux";

export default function NotificationView({ data, }) {
  const dispatch = useDispatch();

  const { createdAt, description, read, type, _id } = data;
  const localTime = new Date(createdAt).toLocaleString();

  const markAsReadNotification = (_id) => {

    const url = `/api/notification/read`;
    const data = {
      id: _id,
      read: true,
    };
    axios
      .patch(url, data)
      .then(({ data }) => {
        if (data.success) {
          const { id } = data.result;
          dispatch(markAsRead(id));
        }
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Notifications.js:39 ~ axios.put ~ error:",
          error
        );
      });

  };

  if (read) {
    return (
      <div className="m-2 p-2 bg-slate-800 rounded border-b border-blue-500">
        <p className="text-slate-300 text-sm">
          <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-500 mr-1"></span>
          {type} <span className="text-slate-600 text-sm">{localTime}</span>
        </p>
        <div className="px-3">
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="m-2 p-2  hover:cursor-pointer rounded border-b border-red-500"
        onClick={() => markAsReadNotification(_id)}
      >
        <p className="text-slate-300  text-sm">
          <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500 mr-1"></span>
          {type} <span className="text-slate-600 text-sm">{localTime}</span>
        </p>
        <div className="px-3">
          <p className=" text-slate-400">{description}</p>
        </div>
      </div>
    );
  }
}
