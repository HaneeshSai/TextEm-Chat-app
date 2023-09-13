// LoginPage.js
import React, { useRef, useState } from "react";
import "../css/loginpage.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Loading from "../components/Loading";
// import firebase from "firebase/app";
// import "firebase/storage";
let component;

export default function LoginPage() {
  const [passwordType, setPasswordType] = useState("password");
  const [page, setPage] = useState("register");
  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [usernameOK, setUsernameOK] = useState(null);
  const [passwordOK, setPasswordOK] = useState(null);
  const [confirmpassOk, setConfirmpassOK] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [pfpFile, setPfpFile] = useState();
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    if (username.length < 6)
      return toast.error("Username must be atleast 6 characters");
    else if (password.length < 8)
      return toast.error("password should be atleast 8 digits");
    else if (password !== confirmPass)
      return toast.error("passwords do not match");

    axios
      .post("http://localhost:3000/checkifexists", { username })
      .then((res) => {
        if (res.data.message === "user exists")
          toast.error(
            "This Username already exists. Please use a different Username"
          );
        else if (res.data.message === "user does not exist") {
          axios
            .post("http://localhost:3000/register", {
              username,
              password,
              gender,
              age,
              displayName,
            })
            .then(() => {
              toast.success("user registerd successfully");
              setisLoading(true);
              const data = {
                username,
                password,
                gender,
                age,
                display_name: displayName,
                pfp: null,
              };
              component = 0;
              openDashBoard(data);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDashBoard = (data) => {
    setTimeout(() => {
      setisLoading(false);
      if (component === 0) {
        navigate("/profilepicture", {
          state: data,
        });
      } else
        navigate("/dashboard", {
          state: data,
        });
    }, 2000);
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/checkifexists", { username, password })
      .then((res) => {
        if (res.data.message === "user does not exist") {
          toast.error("Invalid username. Please Check your Username");
        } else if (res.data.message === "user exists") {
          if (res.data.row[0].password === password) {
            toast.success("login sucess...");
            setisLoading(true);
            component = 1;
            openDashBoard(res.data.row[0]);
          } else toast.error("incorrect password");
        }
      });
  };

  return (
    <>
      <Toaster />
      <Loading isLoading={isLoading} />
      <div className="page">
        <div className="body-box">
          <div className="card-side front" ref={element1Ref}>
            <div className="form-1">
              <h2>REGISTER</h2>
              <form>
                <label htmlFor="">Display Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <div className="age-gender">
                  <div className="gender-box">
                    <label htmlFor="">Gender</label>
                    <select
                      placeholder="female"
                      name="gender"
                      id="gender"
                      required
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="" defaultValue>
                        Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="age-box">
                    <label htmlFor="">Age</label>
                    <input
                      required
                      type="number"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </div>
                <label htmlFor="">Email/Username*</label>
                <input
                  type="text"
                  placeholder="Enter your Email/Username"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                    e.target.value.length < 6
                      ? setUsernameOK(false)
                      : setUsernameOK(true);
                  }}
                />
                <div className={usernameOK === null ? "hidden" : "show-user"}>
                  {usernameOK === true ? <GiCheckMark /> : <RxCrossCircled />}
                </div>
                <label htmlFor="">Password*</label>
                <input
                  type={passwordType}
                  placeholder="Enter your password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    e.target.value.length < 8
                      ? setPasswordOK(false)
                      : setPasswordOK(true);
                  }}
                />
                <div className={passwordOK === null ? "hidden" : "show-pass"}>
                  {passwordOK === true ? <GiCheckMark /> : <RxCrossCircled />}
                </div>
                <div
                  onClick={() => {
                    passwordType === "password"
                      ? setPasswordType("text")
                      : setPasswordType("password");
                  }}
                  className="eye-icon"
                >
                  {passwordType === "password" ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
                <label htmlFor="">Confirm Password*</label>
                <input
                  type={passwordType}
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                    e.target.value !== password
                      ? setConfirmpassOK(false)
                      : setConfirmpassOK(true);
                  }}
                />
                <div
                  className={confirmpassOk === null ? "hidden" : "show-confirm"}
                >
                  {confirmpassOk === true ? (
                    <GiCheckMark />
                  ) : (
                    <RxCrossCircled />
                  )}
                </div>
                <button onClick={register}>Register</button>
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      page === "register"
                        ? setPage("login")
                        : setPage("register");
                      const front = element1Ref.current;
                      const back = element2Ref.current;
                      if (element1Ref && element2Ref) {
                        front.style.transform = "rotateY(180deg)";
                        back.style.transform = "rotateY(0deg)";
                      }
                    }}
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </div>
          <div className="card-side back" ref={element2Ref}>
            <div className="form-1">
              <h3>Welcome Back</h3>
              <h2>LOGIN</h2>
              <form action="">
                <label htmlFor="">Email/Username</label>
                <input
                  type="text"
                  placeholder="Email/Username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="">Password</label>
                <input
                  type={passwordType}
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={() => {
                    passwordType === "password"
                      ? setPasswordType("text")
                      : setPasswordType("password");
                  }}
                  className="login-eye-icon"
                >
                  {passwordType === "password" ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
                <p className="frgt-pass">Forgot Password?</p>
                <button onClick={login}>Login</button>
                <p>
                  Dont have an account?{" "}
                  <span
                    onClick={() => {
                      page === "login" ? setPage("register") : setPage("login");
                      const front = element1Ref.current;
                      const back = element2Ref.current;
                      if (element1Ref && element2Ref) {
                        front.style.transform = "rotateY(0deg)";
                        back.style.transform = "rotateY(-180deg)";
                      }
                    }}
                  >
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
