import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import {
  PlaySquare,
  ClipboardList,
  RadioTower,
  Film,
  BookPlus,
} from "lucide-react";
import { Outlet, Link } from "react-router-dom";

const VideoSidebar = () => {
  return (
    <>
      <div
        style={{ zIndex: 100 }}
        className="fixed left-0 hidden h-screen py-8 pl-5 space-y-6 overflow-y-auto transition-transform bg-white border-r scrollwidth lg:w-64 dark:bg-black border-slate-500/40 dark:border-slate-800 sm:w-16 lg:block"
      >
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/"}>
            <div className="flex flex-row items-center space-x-2 ">
              <BsPeopleFill size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Home
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/"}>
            <div className="flex flex-row items-center space-x-2 ">
              <RadioTower size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Live
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/"}>
            <div className="flex flex-row items-center space-x-2 ">
              <Film size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Reels
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/"}>
            <div className="flex flex-row items-center space-x-2 ">
              <PlaySquare size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Shows
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/explore"}>
            <div className="flex flex-row items-center space-x-2 ">
              <ClipboardList color="#2f76ac" size={28} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Explore
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/saved"}>
            <div className="flex flex-row items-center space-x-2 ">
              <BookPlus color="#2f76ac" size={28} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Saved Videos
              </h1>
            </div>
          </Link>
        </div>
        <div className="h-10"></div>
      </div>
      <div className="fixed left-0 hidden w-16 h-screen py-8 space-y-6 overflow-y-auto transition-transform bg-white border-r scrollwidth dark:bg-black border-slate-500/40 dark:border-slate-800 sm:block lg:hidden">
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <BsPeopleFill size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <RadioTower size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <Film size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <PlaySquare size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <ClipboardList color="#2f76ac" size={28} />
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <BookPlus color="#2f76ac" size={28} />
          </Link>
        </div>
        <div className="h-10"></div>
      </div>
      <Outlet />
    </>
  );
};

export default VideoSidebar;
