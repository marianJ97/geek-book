import React, { useContext } from "react";
import Feed from "../../components/feed/Feed";
import HomeRightbar from "../../components/rightbar/HomeRightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";

import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);

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

export default Home;
