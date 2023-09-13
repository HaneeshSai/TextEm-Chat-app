import React from "react";
import SearchBar from "../components/SearchBar";
import ChatBodyHeader from "../components/ChatBodyHeader";
import ChatBodyMain from "../components/ChatBodyMain";
import ChatUsers from "../components/ChatUsers";
import ChatBodyfooter from "../components/ChatBodyfooter";
import ProfileBar from "../components/ProfileBar";
import { useLocation } from "react-router-dom";

export default function ChatPage() {
  const location = useLocation();

  return (
    <>
      <div className="chat-page">
        <div className="side-bar">
          <SearchBar />
          <ChatUsers searchResults={location.state} />
          <ProfileBar />
        </div>
        <div className="chat-body">
          <ChatBodyHeader />
          <ChatBodyMain />
          <ChatBodyfooter />
        </div>
      </div>
    </>
  );
}
