import { Link } from "react-router-dom";
import "./CloseFriend.css";

function CloseFriend({ user, responsive }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link to={`/profile/${user.username}`}>
      <li className={responsive ? "sidebarFriend" : "searchedFriend"}>
        <img
          className="sidebarFriendImage"
          src={
            user?.profilePicture
              ? user.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
}

export default CloseFriend;
