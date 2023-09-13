import React from "react";
import "../css/homepage.css";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

export default function HomePage({ history }) {
  const GetStarted = () => {
    history.push("/login");
  };

  return (
    <>
      <div className="bg">
        <div className="body">
          <div className="info">
            <h1>TextEm</h1>
            <p>
              A Chat app where you can chat with anyone anywhere. Create Group
              Chats and servers. A place where you can be yourself. A place
              where nobody has to know who you are.
            </p>
            <div className="link">
              <Link className="getstart-btn" to="/login">
                Get Started
              </Link>
            </div>
          </div>
          <div className="image">
            <img src="/images/export.png" alt="img" />
          </div>
        </div>
      </div>
    </>
  );
}
