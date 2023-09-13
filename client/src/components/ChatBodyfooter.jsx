import React from "react";
import { AiOutlinePlus, AiOutlineSend } from "react-icons/ai";

export default function ChatBodyfooter({ route }) {
  return (
    <>
      <div className="chat-footer">
        <div className="plus-icon">
          <AiOutlinePlus size={25} color="black" />
        </div>
        <input type="text" placeholder="Type here ..." />
        <div className="send-icon">
          <AiOutlineSend
            style={{
              position: "relative",
              left: 2,
            }}
            size={20}
          />
        </div>
      </div>
    </>
  );
}
