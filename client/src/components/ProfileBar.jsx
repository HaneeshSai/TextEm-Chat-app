import React from "react";
import { IoSettingsSharp } from "react-icons/io5";

export default function ProfileBar({ data }) {
  return (
    <>
      <div className="profile-box">
        <div className="pfp-name">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="pfp"
          />
          <div className="profile-name">
            <h4>
              {data ? (
                data.display_name.length > 8 ? (
                  `${data.display_name.substring(0, 7)}...`
                ) : (
                  data.display_name
                )
              ) : (
                <p>display Name</p>
              )}
            </h4>
            <p>
              online <span>011</span>
            </p>
          </div>
        </div>
        <div className="settings">
          <IoSettingsSharp size={25} color="#743636" />
        </div>
      </div>
    </>
  );
}
