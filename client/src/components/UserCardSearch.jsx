import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { BiCheckDouble } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

export default function UserCardSearch({ users, user, friendship }) {
  const [recieved, setReceived] = useState(false);
  const [status, setStatus] = useState(
    friendship.length > 0 ? friendship[0].status : " "
  );

  const sendRequest = () => {
    let sender = user.username;
    let reciever = users.username;
    axios
      .post("http://localhost:3000/sendRequests", {
        sender: sender,
        reciever: reciever,
        status: "pending",
      })
      .then((res) => {
        setStatus("pending");
        toast.success(res.data);
        setStatus("pending");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Toaster />
      <div className="usercard">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={users.pfp} alt="" />
          <div
            className={status === "pending" ? "user-name" : "user-head-name"}
          >
            <h4>{users.username}</h4>
            {status === "accepted" ? <p>last message</p> : null}
          </div>
        </div>
        {status === "accepted" ? (
          <div className="time-bluetick">
            <p>12:38</p>
            <div
              style={{
                margin: 0,
                padding: 0,
                marginTop: -15,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {recieved ? <BiCheckDouble /> : <BiCheck />}
            </div>
          </div>
        ) : status === "pending" ? (
          <div className="reqSent">
            <BiLoader size={25} />
          </div>
        ) : (
          <div className="add-friend-icon" onClick={sendRequest}>
            <AiOutlinePlus size={25} />
          </div>
        )}
      </div>
    </>
  );
}
