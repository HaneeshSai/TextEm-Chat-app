import React, { useState } from "react";
import storage from "../firebaseConfig";
import { toast, Toaster } from "react-hot-toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function ProfilePic() {
  const location = useLocation();
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [orginal, setOrignal] = useState(null);
  const [isloading, setisLoading] = useState(false);

  const loadImage = (e) => {
    setOrignal(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const gotoDashboard = (url) => {
    let data = location.state;
    console.log(data);

    data.pfp = url;
    setInterval(() => {
      navigate("/dashboard", {
        state: data,
      });
      setisLoading(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (file === null) toast.success("login success");
    const storageRef = ref(storage, `/file/${location.state.username}`);
    const uploadTask = uploadBytesResumable(storageRef, orginal);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("upload sucess");
          let user = location.state.username;
          axios
            .post("http://localhost:3000/pfpsave", {
              pfplink: downloadURL,
              username: user,
            })
            .then(() => {
              setisLoading(true);
              toast.success("uploaded sucessfully");
              gotoDashboard(downloadURL);
            });
        });
      }
    );
  };

  return (
    <>
      <Toaster />
      <Loading isLoading={isloading} />
      <div className="pfp-page">
        <div className="pfp-body">
          <label htmlFor="">Profile Picture</label>
          <img src={file} alt="" />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={loadImage}
              placeholder="change image"
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}
