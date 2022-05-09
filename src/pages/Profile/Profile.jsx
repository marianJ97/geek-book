import "./Profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const usernameParams = useParams().username;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch(
        `http://localhost:8800/api/users?username=${usernameParams}`
      );
      const data = await res.json();
      setUser(data);
    };
    userFetch();
  }, [usernameParams]);

  return (
    <>
      <div className="profile">
        <Sidebar user={currentUser} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImage"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImage"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png "
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed currentUser={currentUser} username={usernameParams} />
            <Rightbar user={user} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
