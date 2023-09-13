import React, { useState } from "react";
import ChatPage from "../subPages/ChatPage";
import LockedPage from "../subPages/LockedPage";
import ProfilePage from "../subPages/ProfilePage";
import RequestsPage from "../subPages/RequestsPage";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import "../css/dashboard.css";
export default function DashBoard(props) {
  const location = useLocation();
  const [searchResuls, setSearchResults] = useState([]);
  const [friendrequest, setFriendrequest] = useState();
  const [page, setPage] = useState(0);

  const callBack = (data) => {
    setSearchResults(data);
  };

  const changePage = (data) => {
    setPage(data);
    console.log(data);
  };

  return (
    <>
      <div className="page">
        <div className="navbar">
          <NavBar changePage={changePage} />
        </div>
        <div className="pages">
          {page === 0 ? (
            <ChatPage />
          ) : page === 1 ? (
            <ProfilePage />
          ) : page === 2 ? (
            <LockedPage />
          ) : page === 3 ? (
            <RequestsPage />
          ) : null}
        </div>
      </div>
    </>
  );
}
