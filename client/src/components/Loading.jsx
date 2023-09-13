import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../css/loginpage.css";

export default function Loading({ isLoading }) {
  return (
    <>
      <div className={isLoading ? "loading" : "hidden"}>
        <div className="load-icon">
          <AiOutlineLoading3Quarters size={25} color="green" />
        </div>
        Redirecting...
      </div>
    </>
  );
}
