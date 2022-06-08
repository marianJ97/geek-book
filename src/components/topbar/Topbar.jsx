import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Topbar.css";
import Searchbar from "../Searchbar/Searchbar";
import NotificationBar from "../notificationbar/NotificationBar";
import { Menu, Close } from "@material-ui/icons";

function Topbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">GeekBook</span>
        </Link>
      </div>
      <div className="topbarFullWidth">
        <div className="topbarCenter">
          <Searchbar
            user={user}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="topbarRight">
          <NotificationBar user={user} />
        </div>
      </div>
      <div className="hamburger">
        {isOpen ? (
          <Close onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <Menu onClick={() => setIsOpen(!isOpen)} />
        )}
        {isOpen && (
          <div className="topbarResponsive">
            <div className="topbarCenter">
              <Searchbar
                user={user}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
            <div className="topbarRight">
              <NotificationBar user={user} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
