import { useEffect, useState } from "react";
import "./ChatOnline.css";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch(
        `http://localhost:8800/api/users/friends/${currentId}`
      );
      const data = await res.json();
      setFriends(data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await fetch(
        `http://localhost:8800/api/conversation/find/${currentId}/${user._id}`
      );
      const data = await res.json();
      setCurrentChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((online) => (
        <div
          key={online._id}
          onClick={() => handleClick(online)}
          className="chatOnlineFriend"
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                online.profilePicture
                  ? PF + online.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
