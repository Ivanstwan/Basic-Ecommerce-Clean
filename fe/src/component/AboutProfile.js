import React from "react";
import aboutProfile from "../assets/images/AboutPhoto.JPG";
import "./aboutProfile.css";

function AboutProfile() {
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-photo-container">
          <img src={aboutProfile} className="profile-photo" />
        </div>
        <div className="profile-text-container">
          <p className="profile-text-name">Emily Setiawan</p>
          <p className="profile-text-title">Architect</p>
          <p className="profile-text-body">
            A purposeful design practice producing work allied with the concepts
            of reductivism and beautility.
          </p>
          <p className="profile-text-body">
            Projects are functional and considered, delivering dynamic and
            clever solutions with a focus on the organisation of space.
          </p>
          <p className="profile-text-body">
            Nicholas employs a strong conceptual focus and the needs of his
            clients are heavily embedded in the outcomes.
          </p>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-details-education">
          <p className="prof-det-edut-title">[Education]</p>
          <p className="prof-det-edut-text">
            2015 - 2019 Parahyangan Catholic University
          </p>
          <p className="prof-det-edut-text-light">
            Departement of Architecture
          </p>
          <p className="prof-det-edut-text">
            2012 - 2015 SMAK 1 BPK Penabur, Bandung
          </p>
          <p className="prof-det-edut-text-light">Senior High School</p>
          <p className="prof-det-edut-text">
            2009 - 2012 SMPK 1 BPK Penabur, Bandung
          </p>
          <p className="prof-det-edut-text-light">Junior High School</p>
        </div>
        <div className="profile-details-working">
          <p>[Working Experience]</p>
        </div>
        <p>[Organization Experience]</p>
      </div>
    </div>
  );
}

export default AboutProfile;
