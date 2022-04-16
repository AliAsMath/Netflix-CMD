import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { AuthContext } from "./../../contex/auth-contex";
import { Link } from "react-router-dom";

export default function Topbar() {
  const {
    state: { user },
    func,
  } = useContext(AuthContext);

  const logOutHandler = () => {
    func.logout();
    localStorage.removeItem("user");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to="/" className="topLeft">
          <span className="logo">NetflixAdmin</span>
        </Link>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={logOutHandler}>
            LogOut
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src={
              user?.profilePic ||
              "https://i.pinimg.com/474x/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.jpg"
            }
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
