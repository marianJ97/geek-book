import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import HomeRightbar from "../../components/rightbar/HomeRightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";

import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <>
        <div className="homeContainer">
          <Sidebar user={user} />
          <Feed />
          <HomeRightbar user={user} />
        </div>
      </>
    );
  }

  return (
    <>
      <p>You need to log in first</p>
      <Link to="/login">
        <span className="logo">Log in</span>
      </Link>
    </>
  );
}

export default Home;
