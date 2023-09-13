import React, { useEffect, useState } from "react";
import { BsChatLeftText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

export default function NavBar({ changePage }) {
  const [page, setPage] = useState(1);
  useEffect(() => {
    changePage(page);
  }, [page]);
  return (
    <>
      <div
        onClick={() => {
          setPage(0);
        }}
        className={page === 0 ? "navicon active" : "navicon"}
      >
        <BsChatLeftText size={30} color="#743636" />
      </div>
      <div
        onClick={() => {
          setPage(1);
        }}
        className={page === 1 ? "navicon active" : "navicon"}
      >
        <CgProfile size={30} color="#743636" />
      </div>
      <div
        onClick={() => {
          setPage(2);
        }}
        className={page === 2 ? "navicon active" : "navicon"}
      >
        <BiSolidLockAlt size={30} color="#743636" />
      </div>
      <div
        onClick={() => {
          setPage(3);
        }}
        className={page === 3 ? "navicon active" : "navicon"}
      >
        <FaUserFriends size={30} color="#743636" />
      </div>
      <div
        onClick={() => {
          setPage(4);
        }}
        className={page === 4 ? "navicon active" : "navicon"}
      >
        <TbLogout2 size={30} color="#743636" />
      </div>
    </>
  );
}
