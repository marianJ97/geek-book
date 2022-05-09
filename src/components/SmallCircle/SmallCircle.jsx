import React from "react";
import { Link } from "react-router-dom";
import "./SmallCircle.css";

function SmallCircle({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${user?.username}`}>
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "/person/noAvatar.png"
        }
        alt="person"
        className="topbarImage"
      />
    </Link>
  );
}

export default SmallCircle;
