import React from "react";
import { Person, Chat, Notifications } from "@material-ui/icons";
import "./NotificationBar.css";
import SmallCircle from "../SmallCircle/SmallCircle";

function NotificationBar({ user }) {
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
      <SmallCircle user={user} />
    </div>
  );
}

export default NotificationBar;
