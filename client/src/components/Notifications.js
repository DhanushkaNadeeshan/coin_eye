import { useEffect, useState } from "react";
import axios from "axios";
import { selectUser } from "../utils/slice/userSlice";
import { useSelector } from "react-redux";
import Main from "./Main";
import NotificationView from "./notification/NotificationView";
export default function Notifications(props) {
  const userSelector = useSelector(selectUser);

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    if (userSelector.id) {
      const url = `/api/notification/${userSelector.id}`;
      axios
        .get(url)
        .then(({ data }) => {
          if (data.success) {
            setNotificationList(data.result);
          }
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: Notifications.js:17 ~ axios.get ~ error:",
            error
          );
        });
    }
  }, [userSelector]);

  const markAsRead = (_id) => {
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
          const index = notificationList.findIndex((info) => info._id === id);

          if (index > -1) {
            notificationList[index].read = true;
            setNotificationList([...notificationList]);
          }
        }
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Notifications.js:39 ~ axios.put ~ error:",
          error
        );
      });
  };

  return (
    <Main name="Notifications">
      <div className="w-2/3">
        {notificationList.length > 0 &&
          notificationList.map((data, i) => {
            return (
              <NotificationView key={i} data={data} markAsRead={markAsRead} />
            );
          })}
      </div>
    </Main>
  );
}
