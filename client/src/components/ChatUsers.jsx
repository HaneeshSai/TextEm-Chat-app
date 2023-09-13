import React from "react";
import UserCardSearch from "./UserCardSearch";
import UserCardFriendReq from "./UserCardFriendReq";

export default function ChatUsers({ searchResults, user }) {
  // console.log(
  //   searchResults.results?.length > 0 ? searchResults.results : "no users"
  // );

  return (
    <>
      <div className="sidebar-body">
        {searchResults.results?.length > 0 ? (
          searchResults.results.map((item, index) => (
            <UserCardSearch
              key={index}
              users={item.user}
              user={user}
              friendship={item.friendship}
            />
          ))
        ) : (
          <p>body</p>
        )}
      </div>
    </>
  );
}
