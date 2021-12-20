import React, { useState } from "react";
import { Link } from "react-router-dom";
import { URL_API } from "../helper";
import "./register.css";
import Axios from "axios";
import { useHistory } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // STATE - alert message
  const [emailMsg, setEmailMsg] = useState("empty");
  const [passwordMsg, setPasswordMsg] = useState("empty");
  // STATE - alert message opacity (hidden or no)
  const [emailMsgCheck, setEmailMsgCheck] = useState(false);
  const [passMsgCheck, setPassMsgCheck] = useState(false);
  // STATE - disabled after register
  const [disableButton, setDisableButton] = useState(false);

  let history = useHistory();

  const alertReset = () => {
    setEmailMsgCheck(false);
    setPassMsgCheck(false);
  };

  const registerUser = () => {
    const userData = {
      email: email,
      password: password,
    };
    // CHECK EMAIL HAS BEEN REGISTERED
    Axios.get(`${URL_API}/user/checkemail?email=${userData.email}`)
      .then((res) => {
        // 1.SUCCESS email havent registered, pass ok
        if (!Boolean(res.data[0]) && userData.password.length >= 8) {
          Axios.post(`${URL_API}/user/register`, userData)
            .then((res) => {
              setTimeout(() => {
                history.push("/regdone");
              }, 500);
            })
            .catch((err) => {
              console.log("err");
              console.log(err);
            });
        }
        // 2. email already registered, pass ok
        else if (Boolean(res.data[0]) && userData.password.length >= 8) {
          // console.log("2 data no, pass yes");
          setEmailMsg("Email already registered.");
          setEmailMsgCheck(true);
        }
        // 3. email already registered, pass no
        else if (Boolean(res.data[0]) && userData.password.length < 8) {
          // console.log("3 data no, pass no");
          setEmailMsg("Email already registered.");
          setPasswordMsg("Password at least 8 character.");
          setEmailMsgCheck(true);
          setPassMsgCheck(true);
        }
        // 4. email ok, pass no
        else {
          // console.log("4 data yes, pass no");
          setPasswordMsg("Password at least 8 character.");
          setPassMsgCheck(true);
        }
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register--inputside">
          <div className="register--input">
            <div className="register--input-email">
              <div className="register--input-email-icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="register--input-email-box">
                <input
                  type="email"
                  className="register--input-email-here"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    alertReset();
                  }}
                ></input>
              </div>
            </div>
            <div className="register--alert-message">
              <p
                className={
                  emailMsgCheck
                    ? "register--email-msg open"
                    : "register--email-msg"
                }
              >
                {emailMsg}
              </p>
            </div>
            <div className="register--input-password">
              <div className="register--input-pass-icon">
                <i className="fas fa-key"></i>
              </div>
              <div className="register--input-pass-box">
                <input
                  type="password"
                  className="register--input-pass-here"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    alertReset();
                  }}
                ></input>
              </div>
            </div>
            <div className="register--alert-message">
              <p
                className={
                  passMsgCheck
                    ? "register--pass-msg open"
                    : "register--pass-msg"
                }
              >
                {passwordMsg}
              </p>
            </div>
          </div>
          <div className="register--utility">
            <button
              className="register--util-button"
              onClick={() => {
                registerUser();
                // checkEmail();
              }}
              type="button"
              disabled={disableButton}
            >
              <div className="register--util-button-text">
                {disableButton ? "Loading..." : "REGISTER"}
              </div>
            </button>
          </div>
          <div className="register--util-haveacc">Already have an account?</div>
          <Link className="register--util-login" to="/login">
            Login Here
          </Link>
        </div>

        <div className="register--pictside"></div>
      </div>
    </div>
  );
}

export default Register;
