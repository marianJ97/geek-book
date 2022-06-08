import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import "./SocialPanel.css";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const SocialPanel = ({ user }) => {
  const [followers, setFollowers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");

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

  useEffect(() => {
    const getFollowers = async () => {
      if (user._id) {
        try {
          const followerList = await fetch(
            `http://localhost:8800/api/users/followers/${user._id}`
          );
          const data = await followerList.json();

          setFollowers(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFollowers();
  }, [user]);

  return (
    <div className="socialPanel">
      <div className="socialPanelContainer">
        <div className="myNetwork">
          {/* <div className="socialPanelWrapper"> */}
          <h4>Your followers</h4>
          {/* <Searchbar
              onPage
              customPlaceholder={"Search between your followers"}
            /> */}
          <div className="peopleList">
            {followers.map((follower) => (
              <Link
                key={follower._id}
                to={`/profile/${follower.username}`}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImage"
                    src={
                      follower.profilePicture
                        ? follower.profilePicture
                        : `${PF}person/noAvatar.png`
                    }
                    alt=""
                  />
                  <span className="rightbarFollowingName">
                    {follower.username}
                  </span>
                </div>
              </Link>
            ))}
            {/* </div> */}
          </div>
        </div>
        <div className="myNetwork">
          {/* <div className="socialPanelWrapper"> */}
          <h4>Followings</h4>
          {/* <Searchbar
              onPage
              customPlaceholder={"Search between your followings"}
            /> */}
          <div className="peopleList">
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
        </div>
        {/* </div> */}
      </div>
      <div className="socialPanelWrapper">
        <h4>Find another people on GeekBook</h4>
        <Searchbar
          onPage
          customPlaceholder={"Search for new people"}
          setSearchValue={setSearchedValue}
          searchValue={searchedValue}
        />
      </div>
    </div>
  );
};

export default SocialPanel;
