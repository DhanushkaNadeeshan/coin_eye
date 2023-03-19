import { selectNotificationList } from "../utils/slice/notificationSlice";
import { useSelector } from "react-redux";
import Main from "./Main";
import NotificationView from "./notification/NotificationView";
export default function Notifications() {
  const notificationSelector = useSelector(selectNotificationList);

  return (
    <Main name="Notifications">
      <div className="w-2/3">
        {notificationSelector.list.length > 0 &&
          notificationSelector.list.map((data, i) => {
            return <NotificationView key={i} data={data} />;
          })}
      </div>
    </Main>
  );
}
