import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import {PiGitPullRequestBold} from 'react-icons/pi';
import {BiUserPlus,BiSolidUserDetail} from 'react-icons/bi';

import { Outlet, Link } from "react-router-dom";

const SideNavbarFriend = () => {
  return (
    <>
      <div style={{zIndex:100}} className="fixed left-0 hidden w-64 h-screen py-8 pl-5 space-y-6 overflow-y-auto transition-transform bg-white border-r scrollwidth dark:bg-black border-slate-500/40 dark:border-slate-800 epx:block">
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <div className="flex flex-row items-center space-x-2 ">
              <BsPeopleFill size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                 Make Friends
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <div className="flex flex-row items-center space-x-2 ">
              <PiGitPullRequestBold size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Friend Requests
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <div className="flex flex-row items-center space-x-2 ">
              <BiUserPlus size={32} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Suggestions
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25">
          <Link to={"/friends"}>
            <div className="flex flex-row items-center space-x-2 ">
              <BiSolidUserDetail size={32} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                All Friend
              </h1>
            </div>
          </Link>
        </div>
        <div className="h-10"></div>
      </div>
      <Outlet />
    </>
  );
};

export default SideNavbarFriend;
