import React from "react";

const Received = ({ profileImage, message, id, userid, time }) => {
  return (
    <div className="col-start-1 col-end-10 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
          <img
            src={profileImage}
            alt="Profile"
            className="overflow-hidden rounded-full"
          />
        </div>
        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
          <div>Hey How are you today?</div>
        </div>
      </div>
    </div>
  );
};

export default Received;
