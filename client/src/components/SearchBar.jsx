import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

export default function SearchBar({ user, searchResults, TogglefriendReq }) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [toggleFriendReq, setToggleFriendReq] = useState(false);

  useEffect(() => {
    if (toggleFriendReq === false) {
      if (query.length > 1) {
        axios
          .get(
            `http://localhost:3000/search?query=${query}&username=${user.username}`
          )
          .then((response) => {
            setResults(response.data);
            searchResults(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setResults([]);
      }
    }
  }, [query, toggleFriendReq]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for users..."
          onChange={(e) => {
            setToggleFriendReq(false);
            setQuery(e.target.value);
            if (e.target.value.length < 2) searchResults([]);
          }}
        />
        <div className="search-icon">
          <BsSearch size={20} />
        </div>
      </div>
    </>
  );
}
