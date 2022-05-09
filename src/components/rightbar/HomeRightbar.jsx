import { useState, useEffect, useRef } from "react";
import Online from "../online/Online";
import { io } from "socket.io-client";
import "./Rightbar.css";

function HomeRightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`ws://localhost:8900`);
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((following) =>
          users.some((user) => user.userId === following)
        )
      );
    });
  }, [user]);

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

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImage" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Katherine Ccasani </b> and <b>3 other friends</b> have birthday.
            today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineFriends.length ? (
            onlineFriends.map((user) => <Online key={user._id} user={user} />)
          ) : (
            <p>Nobody is online...</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HomeRightbar;
