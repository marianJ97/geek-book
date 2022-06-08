import React, { useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SocialPanel from "../../components/socialPanel/SocialPanel";
import { AuthContext } from "../../context/AuthContext";
import "./PeopleList.css";

const PeopleList = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="homeContainer">
      <Sidebar user={user} />
      <SocialPanel user={user} />
    </div>
  );
};

export default PeopleList;
