import React, { useState } from "react";
import { Link } from "react-router-dom";
import { changeMessage, userLogin } from "../redux/actions";
import { useDispatch, connect } from "react-redux";
import "./login.css";
import Axios from "axios";
import { URL_API } from "../helper";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { userKeepLoggedIn } from "../redux/actions";

function Login({ user }) {
  // REDUX
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user.email) {
      history.push("/");
    } else if (token) {
      keepLogin();
      history.push("/");
    }
  }, []);
  // REDUX
  const keepLogin = (e) => {
    dispatch(userKeepLoggedIn());
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMsg, setEmailMsg] = useState("empty");
  const [passwordMsg, setPasswordMsg] = useState("empty");

  const [emailMsgCheck, setEmailMsgCheck] = useState(false);
  const [passMsgCheck, setPassMsgCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const alertReset = () => {
    setEmailMsgCheck(false);
    setPassMsgCheck(false);
    setLoading(false);
  };

  const loginUser = () => {
    setLoading(true);
    // USER DATA WILL BE SENT
    const userLoginData = {
      email: email,
      password: password,
    };
    // alert condition
    // 1. pass no, email no
    if (password === "" && email === "") {
      setEmailMsg("email is empty");
      setPasswordMsg("password is empty");
      setEmailMsgCheck(true);
      setPassMsgCheck(true);
    }
    // 2. pass ok, email no
    else if (email === "") {
      setEmailMsgCheck(true);
      setEmailMsg("email is empty");
    }
    // 3. pass no, email ok
    else if (password === "") {
      setPassMsgCheck(true);
      setPasswordMsg("password is empty");
    }
    // 4. pass OK, email OK
    else if (password && email) {
      // condition
      Axios.get(`${URL_API}/user/checkuser?email=${email}`).then((res) => {
        if (res.data[0]) {
          Axios.post(`${URL_API}/user/login`, userLoginData)
            .then((res) => {
              if (res.data) {
                loginRedux(res.data);
                setTimeout(() => {
                  history.push("/");
                }, 500);
              }
              // 2. email ok, pass not ok
              else {
                setPassMsgCheck(true);
                setPasswordMsg("Email and/or Password incorrect.");
                setLoading(false);
              }
            })
            // 3. email not ok OR/AND pass not ok
            .catch((err) => {
              setPassMsgCheck(true);
              setPasswordMsg("Email and/or Password incorrect.");
              setLoading(false);
            });
        } else {
          setEmailMsg("Email not verified/registered");
          setEmailMsgCheck(true);
          setLoading(false);
        }
      });
    }
  };

  // REDUX
  const dispatch = useDispatch();

  const changeMes = () => {
    dispatch(changeMessage());
  };

  // user-login REDUX, bsa pake ini jga (cara ke-2)
  const loginRedux = (e) => {
    dispatch(userLogin(e));
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login--inputside">
          <div className="login--input">
            <div className="login--input-email">
              <div className="login--input-email-icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="login--input-email-box">
                <input
                  type="text"
                  className="login--input-email-here"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    alertReset();
                  }}
                ></input>
              </div>
            </div>
            <div className="login--alert-message">
              <p
                className={
                  emailMsgCheck ? "login--email-msg open" : "login--email-msg"
                }
              >
                {emailMsg}
              </p>
            </div>
            <div className="login--input-password">
              <div className="login--input-pass-icon">
                <i className="fas fa-key"></i>
              </div>
              <div className="login--input-pass-box">
                <input
                  type="password"
                  className="login--input-pass-here"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    alertReset();
                  }}
                ></input>
              </div>
            </div>
            <div className="login--alert-message">
              <p
                className={
                  passMsgCheck ? "login--pass-msg open" : "login--pass-msg"
                }
              >
                {passwordMsg}
              </p>
            </div>
          </div>
          <div className="login--utility">
            <button
              className="login--util-button"
              onClick={() => {
                loginUser();
              }}
              disabled={loading}
            >
              <div className="login--util-button-text">LOGIN</div>
            </button>
            <div className="login--util-notlogin">
              <div className="login--util-forgetpass">Forgot Password?</div>
            </div>
          </div>
          <div className="login-breaker-or">
            <div className="login--linebreak" />
            <div className="login--or">or</div>
            <div className="login--linebreak" />
          </div>
          <Link className="login--util-register" to="/register">
            Register Now
          </Link>
        </div>

        <div className="login--pictside"></div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps, { userLogin })(Login);
