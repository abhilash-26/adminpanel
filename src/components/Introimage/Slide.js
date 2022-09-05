import React, { useState } from "react";
import "./slide.css";
import axios from "axios";

function Slide({ slide }) {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadLoad, setUploadLoad] = useState(false);
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };
  const handleFileUpload = async () => {
    setUploadLoad(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", "companyLogo");
    const result = await axios({
      method: "post",
      url: "http://103.38.50.113:3000/api/v1/users/upload-file",
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTUzNTgyMzMyMywicm9sZSI6IkFyZWEgZnJhbmNoaXNlIiwiaWF0IjoxNjYyMTQ3NTA4fQ.82eDvdVwfu9Llv9Bq6v_NsONQGY2AYwGZmV053lKAK4",
      },
      data: formData,
    });
    console.log(result.data);
    if (result.data.meta.flag == "SUCCESS") {
      const slideData = await axios({
        method: "post",
        url: "http://103.38.50.113:3000/api/v1/intro-slide/create-intro-slides",
        data: {
          url: result.data.data.url,
          slideNo: slide.slideNo,
        },
      });
      console.log(slideData.data.data);
      alert(`${slideData.data.meta.message}`);
    }
    setUploadLoad(false);
  };
  const handleFileDelete = async () => {
    const result = await axios({
      method: "post",
      url: "http://103.38.50.113:3000/api/v1/intro-slide/delete-intro-slides",
      data: {
        id: slide._id,
      },
    });
    console.log(result);
    if (result.data.meta.flag == "SUCCESS") {
      alert(`${result.data.meta.message}`);
    } else {
      alert(`${result.data.meta.message}`);
    }
  };
  return (
    <div className="slide_container">
      Slide {slide.slideNo}
      <img alt="test" src={`${slide.imageUrl}`} className="slide_image" />
      <div className="button_box">
        {!uploadLoad && <input type="file" onChange={handleFileChange} />}

        {!uploadLoad && (
          <button className="upload" onClick={handleFileUpload}>
            upload
          </button>
        )}

        {uploadLoad && <h2>Uploading...</h2>}
        {/* <button className="view_upload">View uploaded url</button> */}
        {/* <button className="view">view</button> */}
        {!uploadLoad && (
          <button className="delete" onClick={handleFileDelete}>
            delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Slide;
