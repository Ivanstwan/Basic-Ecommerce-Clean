import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import "./verification.css";
import { URL_API } from "../helper";
import { connect } from "react-redux";

function Verification(props) {
  const [verifyState, setVerifyState] = useState({
    message: "Verifing Account... Please wait...",
    verify: false,
  });

  let history = useHistory();

  useEffect(() => {
    Axios.patch(
      `${URL_API}/user/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${props.match.params.token}`,
        },
      }
    )
      .then((res) => {
        setVerifyState({
          message: "Your Account is Verified",
          verify: true,
          messagePlus: "You will be redirected to landing page...",
        });
        setTimeout(() => {
          // redirect ke login
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setVerifyState({ message: "Failed to Verified Account" });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="verification">
        <div className="verification-container">
          <i className={verifyState.verify ? "fas fa-check" : "none"} />
          <div className="ver-done-word">
            <h1 className="ver-done-word-1">{verifyState.message}</h1>
            <p className="ver-done-word-2">{verifyState.messagePlus}</p>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(Verification);
