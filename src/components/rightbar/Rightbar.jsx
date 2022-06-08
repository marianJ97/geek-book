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
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    city: user.city,
    country: user.from,
    relationship: user.relationship,
  });
  const { dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser?.following.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
    setUserInfo({
      city: user.city,
      country: user.from,
      relationship: user.relationship,
    });
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

  const submitEdit = () => {
    fetch(`http://localhost:8800/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        city: userInfo.city,
        from: userInfo.country,
        relationship: userInfo.relationship,
      }),
    }).then((res) => {
      if (res.status === 200) {
        console.log("success");
      } else {
        console.log("not working", res.statusText);
      }
    });
    setOpen(false);
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
              {open ? (
                <input
                  placeholder="Write your city"
                  className="profileEditInput"
                  type="text"
                  id="city"
                  name="city"
                  value={userInfo.city}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, city: event.target.value })
                  }
                />
              ) : (
                <span className="rightbarInfoValue">{userInfo.city}</span>
              )}
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              {open ? (
                <input
                  placeholder="Write your country"
                  className="profileEditInput"
                  type="text"
                  id="country"
                  name="country"
                  value={userInfo.country}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, country: event.target.value })
                  }
                />
              ) : (
                <span className="rightbarInfoValue">{userInfo.country}</span>
              )}
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              {open ? (
                <select
                  placeholder="Write your city"
                  className="profileEditInput"
                  type="select"
                  name="relationship"
                  id="relationship"
                  value={userInfo.relationship}
                  onChange={(event) =>
                    setUserInfo({
                      ...userInfo,
                      relationship: Number(event.target.value),
                    })
                  }
                >
                  <option value={1}>Single</option>
                  <option value={2}>Married</option>
                  <option value={3}>Complicated</option>
                </select>
              ) : (
                <span className="rightbarInfoValue">
                  {userInfo.relationship === 1
                    ? "Single"
                    : userInfo.relationship === 2
                    ? "Married"
                    : "Complicated"}
                </span>
              )}
            </div>
            {currentUser._id === user._id && (
              <div>
                <button className="generalButton" onClick={() => setOpen(true)}>
                  Edit profile info
                </button>
                {open && (
                  <button className="generalButton" onClick={submitEdit}>
                    Save
                  </button>
                )}
              </div>
            )}
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
                        ? friend.profilePicture
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
