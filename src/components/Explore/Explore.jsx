import React from "react";
import SideNavbar from "../subcomponents/SideNavbar";

const Explore = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SideNavbar />
      <div className="md:px-20 sm:py-3 sm:px-5 lg:ml-64 sm:ml-16">
        <div className="w-full px-1 py-2 bg-white dark:bg-black sm:hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-1.5  px-2 dark:text-white focus:outline-none text-black text-lg rounded-lg bg-neutral-500/30 dark:bg-neutral-600/50"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
          <div className="w-full h-full bg-red-500 aspect-square"></div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
