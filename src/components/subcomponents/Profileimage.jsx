import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Profileimage = ({ imgsrc }) => {
  const [profileimageloaded, setprofileimageloaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
        console.log("Hello");
      setprofileimageloaded(true);
    };

    img.src = imgsrc;
  }, [imgsrc]);
  return (
    <img
      className="transition img-container border-none rounded-full w-11 h-11 hover:scale-105"
      src={profileimageloaded ? imgsrc : "/user.png"}
      alt=""
      loading="lazy"
    />
  );
};

export default Profileimage;
