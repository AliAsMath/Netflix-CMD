import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const result = await axios.get("users?new=true");
        setNewUsers(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li key={user._id} className="widgetSmListItem">
            <img
              src={
                user?.profilePic ||
                "https://i.pinimg.com/474x/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
