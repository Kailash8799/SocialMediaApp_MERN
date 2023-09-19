import React from "react";

const ExplorePost = ({img}) => {
  return (
    <div className="w-full h-full shadow-inner shadow-black dark:shadow-white img-container aspect-square">
      <img
        src={img}
        alt=""
        className="object-cover w-full h-full img-container"
      />
    </div>
  );
};

export default ExplorePost;
