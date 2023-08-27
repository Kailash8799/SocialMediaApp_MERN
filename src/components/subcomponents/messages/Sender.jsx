import React from "react";

const Sender = ({profileImage,message,id,userid,time}) => {
  return (
    <div className="col-start-4 col-end-13 p-3 rounded-lg">
      <div className="flex flex-row-reverse items-center justify-start">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden bg-indigo-500 rounded-full">
          <img src={profileImage} alt="Profile" className="overflow-hidden rounded-full"/>
        </div>
        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
          <div>I'm ok what about you?</div>
        </div>
      </div>
    </div>
  );
};

export default Sender;
