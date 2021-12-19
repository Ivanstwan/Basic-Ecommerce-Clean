import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");

  const submitEmail = () => {
    console.log(email);
  };

  return (
    <div className="contact-container">
      <div className="contact-text-container">
        <p className="contact-text-1">
          If you have any requests, please feel free to contact.
        </p>
        <p className="contact-text-2">emily.setiawan@gmail.com</p>
      </div>
      <div className="contact-email-container">
        <p className="contact-email-1">
          Input your email below if you need further information
        </p>
        <div className="contact-email-input-container">
          <input
            placeholder="name@mail.com"
            className="contact-email-input-1"
            onChange={(e) => {
              setAlert("");
              setEmail(e.target.value);
            }}
            value={email}
          ></input>
          <button
            className="contact-email-input-button"
            onClick={() => {
              if (email !== "") {
                submitEmail();
              } else {
                setAlert("Email empty");
              }
            }}
          >
            Submit
          </button>
        </div>
        <p className="contact-email-alert">{alert}</p>
      </div>
    </div>
  );
}

export default Contact;
