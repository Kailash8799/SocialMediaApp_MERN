import React from "react";

const Sender = ({profileImage,message,id,userid,time}) => {
  return (
    <div class="col-start-4 col-end-13 p-3 rounded-lg">
      <div class="flex items-center justify-start flex-row-reverse">
        <div class="flex items-center justify-center overflow-hidden h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <img src={profileImage} alt="Profile" className="rounded-full overflow-hidden"/>
        </div>
        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>I'm ok what about you?</div>
        </div>
      </div>
    </div>
  );
};

export default Sender;
