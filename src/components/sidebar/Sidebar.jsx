import "./Sidebar.css";
import {
  Bookmark,
  Chat,
  Event,
  Group,
  AccountCircle,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  Settings,
  School,
  WorkOutline,
} from "@material-ui/icons";

import { useEffect, useState } from "react";

import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";

function Sidebar({ user }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch(
        `http://localhost:8800/api/users/friends/${user._id}`
      );
      const data = await res.json();
      setFriends(data);
    };
    getFriends();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to={"/"}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <Link to={"/messenger"}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>

          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <Link to={"/people"}>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">People</span>
            </li>
          </Link>
          <Link to={`/profile/${user.username}`}>
            <li className="sidebarListItem">
              <AccountCircle className="sidebarIcon" />
              <span className="sidebarListItemText">My profile</span>
            </li>
          </Link>

          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">Settings</span>
          </li>
          {/* <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.map((user) => (
            <CloseFriend key={user._id} user={user} responsive />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
