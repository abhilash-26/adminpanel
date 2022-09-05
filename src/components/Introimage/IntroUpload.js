import axios from "axios";
import React, { useEffect, useState } from "react";
import "./introUpload.css";
import Slide from "./Slide";

function IntroUpload() {
  const [allSlide, setAllSlide] = useState([]);

  useEffect(() => {
    const getAllSlide = async () => {
      const result = await axios({
        method: "get",
        url: "http://103.38.50.113:3000/api/v1/intro-slide/get-intro-slides",
      });
      console.log(result.data);
      if (result.data.meta.flag == "SUCCESS") {
        setAllSlide(result.data.data);
        console.log(allSlide);
      }
    };
    getAllSlide();
  }, []);

  return (
    <div className="container">
      <h2>Intro slide</h2>
      {allSlide.map((item, i) => (
        <Slide slide={item} key={item._id} />
      ))}
      {/* <Slide slideNo={1} />
      <Slide slideNo={2} />
      <Slide slideNo={3} /> */}
    </div>
  );
}

export default IntroUpload;
