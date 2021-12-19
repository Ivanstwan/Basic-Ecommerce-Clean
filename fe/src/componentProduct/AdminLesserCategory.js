import React, { useEffect, useState } from "react";
import "./adminLesserCategory.css";
import Axios from "axios";
import { URL_API } from "../helper";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useHistory } from "react-router";

function AdminLesserCategory(props) {
  const [imageSelected, setImageSelected] = useState("");
  // option state
  const [mainOption, setMainOption] = useState();

  // will be send data to BE
  const [selectedMain, setSelectedMain] = useState();
  const [selectedLesser, setSelectedLesser] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");

  // ++ bonus help UI
  // display imag selected
  const [displayImage, setDisplayImage] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (props.user.role !== 99) {
      history.push("/");
    } else if (props.user.role === 99) {
      getCategoryData();
    }
  }, []);

  const getCategoryData = () => {
    Axios.get(`${URL_API}/product/getmaincategory`)
      .then((res) => {
        // initial state 'selected main'
        setSelectedMain(res.data[0].id);

        const renderOptionMain = res.data.map((data) => {
          return <option value={data.id}>{data.category_name}</option>;
        });

        setMainOption(renderOptionMain);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("image", imageSelected);

    Axios.post(
      `${URL_API}/product/postcloud?main=${selectedMain}&lesser=${selectedLesser}&desc=${selectedDesc}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const checkState = () => {
    console.log(selectedMain);
  };

  return (
    <div className="admin-lesser">
      <h1>Input new Lesser Category!</h1>
      <div className="admin-lesser-container">
        <div className="admin-lesser-preview">
          <div className="ad-lesser-image-preview">
            {imageSelected ? (
              <div className="ad-lesser-image-display-container">
                <img src={displayImage} className="ad-lesser-image-display" />
              </div>
            ) : (
              <div className="ad-lesser-image-display-container">
                <img
                  src="https://res.cloudinary.com/basicecommerce/image/upload/v1637179385/default-picture_rwbsag.png"
                  className="ad-lesser-image-display"
                />
              </div>
            )}
          </div>
          <div className="ad-lesser-preview-title">
            {!selectedLesser ? "TITLE PREVIEW" : selectedLesser}
          </div>
          <div className="ad-lesser-preview-desc">
            {!selectedDesc
              ? "Desc PREVIEW - you can write anything here"
              : selectedDesc}
          </div>
        </div>
        <div className="ad-lesser-category-container">
          <div className="ad-lesser-input-image-container">
            <input
              type="file"
              onChange={(event) => {
                if (displayImage && event.target.files[0]) {
                  URL.revokeObjectURL(displayImage);

                  setImageSelected(event.target.files[0]);

                  const file = event.target.files[0];
                  const url = URL.createObjectURL(file);

                  setDisplayImage(url);
                } else if (event.target.files[0]) {
                  setImageSelected(event.target.files[0]);

                  const file = event.target.files[0];
                  const url = URL.createObjectURL(file);

                  setDisplayImage(url);
                }
                // setImageSelected(event.target.files[0]);

                // const file = event.target.files[0];
                // const url = URL.createObjectURL(file);

                // setDisplayImage(url);
              }}
            />
          </div>
          <select
            onChange={(e) => {
              setSelectedMain(e.target.value);
            }}
            value={selectedMain}
            className="ad-lesser-input-main"
          >
            {mainOption}
          </select>
          <input
            type="text"
            value={selectedLesser}
            onChange={(e) => {
              setSelectedLesser(e.target.value);
            }}
            placeholder="Lesser Category"
            className="ad-lesser-input-lesser"
          ></input>
          <input
            type="text"
            value={selectedDesc}
            onChange={(e) => {
              setSelectedDesc(e.target.value);
            }}
            placeholder="Description"
            className="ad-lesser-input-desc"
          ></input>
          {/* <input>Input your file here</input> */}
          <button
            onClick={() => {
              uploadImage();
            }}
            className="ad-lesser-input-submit"
            disabled={
              !selectedDesc ||
              !selectedLesser ||
              !selectedMain ||
              !imageSelected
            }
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(AdminLesserCategory);
