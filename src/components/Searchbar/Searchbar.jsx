import React, { useEffect, useState } from "react";
import { Search } from "@material-ui/icons";
import "./Searchbar.css";
import Dropdown from "../dropdown/Dropdown";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";

function Searchbar({ onPage, customPlaceholder, searchValue, setSearchValue }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (searchValue) {
      const getPeople = async () => {
        try {
          const peopleList = await fetch(
            `http://localhost:8800/api/users/searchedUsers?searchedValue=${searchValue}`
          );
          const data = await peopleList.json();
          console.log(data);
          setPeople(data);
        } catch (error) {
          console.log(error);
        }
      };
      getPeople();
    }
  }, [searchValue]);

  return (
    <>
      <div className={onPage ? "searchbarOnPage" : "searchbar"}>
        <Search className="searchIcon" />
        <input
          className="searchInput"
          placeholder={customPlaceholder || "Search for new friends"}
          type="text"
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
        />

        {searchValue && !onPage && (
          <Dropdown>
            <p className="searchedUsers">Geekbook users:</p>
            <div className="searchedUsersList">
              {people.length ? (
                people?.map((person) => (
                  <CloseFriend key={person._id} user={person} />
                ))
              ) : (
                <p>No people with this name</p>
              )}
            </div>

            <Link to="/people" className="linkPeople">
              <p onClick={() => setSearchValue("")}>Show more people</p>
            </Link>
          </Dropdown>
        )}
      </div>
      {searchValue && onPage && (
        <div className="peopleList">
          {people.length ? (
            people?.map((person) => (
              <CloseFriend key={person._id} user={person} />
            ))
          ) : (
            <p>No people with this name</p>
          )}
        </div>
      )}
    </>
  );
}

export default Searchbar;
