import "./Rightbar.css";
// import Online from "../online/Online";
import { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Rightbar({ user, currentUser }) {
  const [friends, setFriends] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser?.following.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      if (user._id) {
        try {
          const friendsList = await fetch(
            `http://localhost:8800/api/users/friends/${user._id}`
          );
          const data = await friendsList.json();

          setFriends(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await fetch(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser._id }),
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await fetch(`http://localhost:8800/api/users/${user._id}/follow`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser._id }),
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <>
          {user?.username !== currentUser?.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
          <h2 className="rightbarTitle">User information </h2>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
                {user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : "Complicated"}
              </span>
            </div>
          </div>
          <h4>Following</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link
                key={friend._id}
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImage"
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : `${PF}person/noAvatar.png`
                    }
                    alt=""
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      </div>
    </div>
  );
}

export default Rightbar;
