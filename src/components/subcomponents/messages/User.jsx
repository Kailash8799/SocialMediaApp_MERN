import React from "react";

const User = ({ profileImage,user }) => {
  return (
    <button className="flex flex-row items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl">
      <div className="flex items-center justify-center w-8 h-8 text-black bg-indigo-200 rounded-full dark:text-white">
        <img
          src={user?.profileImage || profileImage}
          alt="Profile"
          className="overflow-hidden rounded-full"
        />
      </div>
      <div className="ml-2 text-sm font-semibold text-black dark:text-white">
        {user?.username}
      </div>
    </button>
  );
};

export default User;
