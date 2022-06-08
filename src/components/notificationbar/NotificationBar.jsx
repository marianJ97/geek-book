import React, { useContext, useState } from "react";
import { Person, Chat, Notifications, ExitToApp } from "@material-ui/icons";
import "./NotificationBar.css";
import SmallCircle from "../SmallCircle/SmallCircle";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NotificationBar({ user }) {
  const [logout, setLogout] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="topbarIcons">
      <div className="topbarIconItem">
        <Person />
        <span className="topbarIconBadge">1</span>
      </div>
      <div className="topbarIconItem">
        <Chat />
        <span className="topbarIconBadge">1</span>
      </div>
      <div className="topbarIconItem">
        <Notifications />
        <span className="topbarIconBadge">1</span>
      </div>
      <div
        onMouseEnter={() => setLogout(true)}
        onMouseLeave={() => setLogout(false)}
        onClick={() => {
          dispatch({ type: "LOGIN_SUCCESS", payload: null });
          navigate("/");
        }}
        className="topbarIconItem"
      >
        {logout && <p className="logoutInfo">Click to Log out</p>}
        <ExitToApp />
      </div>
      <SmallCircle user={user} />
    </div>
  );
}

export default NotificationBar;
