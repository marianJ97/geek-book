import React from "react";
import { Search } from "@material-ui/icons";
import "./Searchbar.css";

function Searchbar() {
  return (
    <div className="searchbar">
      <Search className="searchIcon" />
      <input
        className="searchInput"
        placeholder="Search for new friends"
        type="text"
      />
    </div>
  );
}

export default Searchbar;
