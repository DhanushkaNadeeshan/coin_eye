import Main from "./Main"
import NotificationView from "./NotificationView"
export default function Notifications(props) {

    return (<Main name="Notifications">
        <div className="w-2/3">
            <NotificationView
                description="Test"
                time="2 mints ago"
                title="New loging"
            />
             <NotificationView
                description="Test"
                time="2 mints ago"
                title="New loging"
            />
        </div>
    </Main>)
}