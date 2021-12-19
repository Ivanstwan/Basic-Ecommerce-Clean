import React, { useEffect, useState } from "react";
import Axios from "axios";
import { URL_API } from "../helper";
import "./adminLesserProduct.css";
import { useHistory } from "react-router";
import { connect } from "react-redux";

function AdminLesserProduct(props) {
  const [imageProductSelected, setImageProductSelected] = useState("");
  // option state
  const [lesserOption, setLesserOption] = useState();

  // will be send data to BE
  const [selectedLesser, setSelectedLesser] = useState();
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const [stock, setStock] = useState(0);
  const [oriPrice, setOriPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [selectedDesc2, setSelectedDesc2] = useState("");
  const [selectedDesc3, setSelectedDesc3] = useState("");

  // ++ bonus help UI
  // display imag selected
  const [displayImage, setDisplayImage] = useState("");

  const [errMessage, setErrMessage] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (props.user.role !== 99) {
      history.push("/");
    } else if (props.user.role === 99) {
      getLesserData();
    }
  }, []);

  const getLesserData = () => {
    Axios.get(`${URL_API}/product/getlessercat`)
      .then((res) => {
        // initial state 'selected main'
        setSelectedLesser(res.data[0].id);

        const renderOptionMain = res.data.map((data) => {
          return <option value={data.id}>{data.lesser_name}</option>;
        });

        setLesserOption(renderOptionMain);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postLesserProduct = () => {
    // condition before axios post
    if (selectedDesc3.length > 255) {
      setErrMessage(
        `Character over 255. (currently have ${selectedDesc3.length} characters)`
      );
    } else if (selectedDesc3.length <= 255) {
      const formData = new FormData();
      // formData.append("file", imageSelected);
      formData.append("image", imageProductSelected);
      // formData.append("upload_preset", "basic_ecommerce");

      Axios.post(`${URL_API}/product/lesserproductimagepost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          const productData = {
            selectedLesser,
            selectedProductName,
            selectedDesc,
            stock,
            oriPrice,
            sellPrice,
            selectedDesc2,
            selectedDesc3,
            imageURL: res.data.imageURL,
            imageID: res.data.imageID,
          };
          Axios.post(`${URL_API}/product/lesserproductpost`, productData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="ad-lesser-product">
      <h1>Input Lesser Product!</h1>
      {/* <button onClick={() => getLesserData()}>get many lesser</button>
      <button onClick={() => postLesserProduct()}>post lesser product</button>
      <button onClick={() => checkState()}>check state</button> */}
      <div className="ad-lesserprod-container">
        <div className="ad-lesserprod-preview">
          <div className="ad-lesserprod-card-preview">
            {imageProductSelected ? (
              <div className="ad-lesserprod-image-container">
                <img src={displayImage} className="ad-lesserprod-image" />
              </div>
            ) : (
              <div className="ad-lesserprod-image-container">
                <img
                  src="https://res.cloudinary.com/basicecommerce/image/upload/v1637179385/default-picture_rwbsag.png"
                  className="ad-lesserprod-image"
                />
              </div>
            )}
            <div className="ad-lesserprod-card-title">
              {!selectedProductName ? "Product Name" : selectedProductName}
            </div>
            <div className="ad-lesserprod-card-desc">
              {!selectedDesc ? "Product description preview" : selectedDesc}
            </div>
          </div>
        </div>
        <div className="ad-lesserprod-input-container">
          <div className="ad-lesserprod-input-image-container">
            <input
              type="file"
              onChange={(event) => {
                if (displayImage && event.target.files[0]) {
                  URL.revokeObjectURL(displayImage);

                  setImageProductSelected(event.target.files[0]);

                  const file = event.target.files[0];
                  const url = URL.createObjectURL(file);

                  setDisplayImage(url);
                } else if (event.target.files[0]) {
                  setImageProductSelected(event.target.files[0]);

                  const file = event.target.files[0];
                  const url = URL.createObjectURL(file);

                  setDisplayImage(url);
                }
                setImageProductSelected(event.target.files[0]);

                const file = event.target.files[0];
                const url = URL.createObjectURL(file);

                setDisplayImage(url);
              }}
            />
          </div>
          <select
            onChange={(e) => {
              setSelectedLesser(e.target.value);
            }}
            value={selectedLesser}
            className="ad-lesserprod-input-lesser"
          >
            {lesserOption}
          </select>
          <input
            type="text"
            value={selectedProductName}
            onChange={(e) => {
              setSelectedProductName(e.target.value);
            }}
            placeholder="Product Name"
            className="ad-lesserprod-input-product-name"
          ></input>
          <input
            type="text"
            value={selectedDesc}
            onChange={(e) => {
              setSelectedDesc(e.target.value);
            }}
            placeholder="Description"
            className="ad-lesserprod-input-desc"
          ></input>
          <div className="ad-lesserprod-input-tag">Stock</div>
          <input
            type="number"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
            }}
            placeholder="Initial Stock"
            className="ad-lesserprod-input-stock"
          ></input>
          <div className="ad-lesserprod-input-tag">Ori Price</div>
          <input
            type="number"
            value={oriPrice}
            onChange={(e) => {
              setOriPrice(e.target.value);
            }}
            placeholder="Original Price (10000)"
            className="ad-lesserprod-input-ori"
          ></input>
          <div className="ad-lesserprod-input-tag">Selling Price</div>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => {
              setSellPrice(e.target.value);
            }}
            placeholder="Selling Price (15000)"
            className="ad-lesserprod-input-selling"
          ></input>
          <input
            type="text"
            value={selectedDesc2}
            onChange={(e) => {
              setSelectedDesc2(e.target.value);
            }}
            placeholder="Description 2"
            className="ad-lesserprod-input-desc-2"
          ></input>
          <input
            type="text"
            value={selectedDesc3}
            onChange={(e) => {
              setSelectedDesc3(e.target.value);
              setErrMessage("");
            }}
            placeholder="Description 3"
            className="ad-lesserprod-input-desc-3"
          ></input>
          <button
            onClick={() => {
              postLesserProduct();
            }}
            className="ad-lesser-input-submit"
            disabled={
              !imageProductSelected ||
              !selectedLesser ||
              !selectedProductName ||
              !selectedDesc ||
              !stock ||
              !oriPrice ||
              !sellPrice ||
              !selectedDesc3 ||
              !selectedDesc2
            }
          >
            Upload Product
          </button>
          <div>{errMessage}</div>
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

export default connect(mapStateToProps)(AdminLesserProduct);
