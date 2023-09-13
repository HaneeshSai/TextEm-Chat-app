import axios from "axios";
import React, { useEffect } from "react";

export default function ChatBodyHeader({ sender, reciever }) {
  useEffect(() => {
    axios.post();
  }, []);
  return (
    <>
      <div className="chat-header">
        <img
          src="https://media.discordapp.net/attachments/989902140992528404/1140884818331177051/df62481aa6630e482b168cedcd573c67.png?width=662&height=662"
          alt="pfp img"
        />
        <div>
          <h4>Cetirizine</h4>
          <p>
            online <span>011</span>
          </p>
        </div>
      </div>
    </>
  );
}
