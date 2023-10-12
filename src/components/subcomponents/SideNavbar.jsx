import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { FcOvertime } from "react-icons/fc";
import {
  Image,
  PlaySquare,
  ClipboardList,
  Store,
  SaveAll,
  MessagesSquare,
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div
        style={{ zIndex: 100 }}
        className="fixed left-0 hidden h-screen py-8 pl-5 space-y-6 overflow-y-auto transition-transform bg-white border-r scrollwidth lg:w-64 dark:bg-black border-slate-500/40 dark:border-slate-800 sm:w-16 lg:block"
      >
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/friends" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}
        >
          <Link to={"/friends"}>
            <div className="flex flex-row items-center space-x-2 ">
              <BsPeopleFill size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Friends
              </h1>
            </div>
          </Link>
        </div>
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/explore"
              ? "dark:bg-slate-400/10 bg-slate-400/25 "
              : ""
          }`}
        >
          <Link to={"/explore"}>
            <div className="flex flex-row items-center space-x-2 ">
              <FcOvertime size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Feeds
              </h1>
            </div>
          </Link>
        </div>
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/posts" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}
        >
          <Link to={"/posts"}>
            <div className="flex flex-row items-center space-x-2 ">
              <Image size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Posts
              </h1>
            </div>
          </Link>
        </div>
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/watch" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}
        >
          <Link to={"/watch"}>
            <div className="flex flex-row items-center space-x-2 ">
              <PlaySquare size={28} color="#2f76ac" />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Videos
              </h1>
            </div>
          </Link>
        </div>
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/tweets"
              ? "dark:bg-slate-400/10 bg-slate-400/25 "
              : ""
          }`}
        >
          <Link to={"/tweets"}>
            <div className="flex flex-row items-center space-x-2 ">
              <ClipboardList color="#2f76ac" size={28} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Texts
              </h1>
            </div>
          </Link>
        </div>
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/marketplace"
              ? "dark:bg-slate-400/10 bg-slate-400/25 "
              : ""
          }`}
        >
          <Link to={"/marketplace"}>
            <div className="flex flex-row items-center space-x-2 ">
              <Store color="#2f76ac" size={28} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Marketplace
              </h1>
            </div>
          </Link>
        </div>
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/saved" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}
        >
          <Link to={"/saved"}>
            <div className="flex flex-row items-center space-x-2 ">
              <SaveAll color="#2f76ac" size={28} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Saved
              </h1>
            </div>
          </Link>
        </div>
        {/* <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/messages"
              ? "dark:bg-slate-400/10 bg-slate-400/25 "
              : ""
          }`}
        >
          <Link to={"/messages"}>
            <div className="flex flex-row items-center space-x-2 ">
              <MessagesSquare color="#2f76ac" size={28} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Message
              </h1>
            </div>
          </Link>
        </div> */}
        <div className="h-10"></div>
      </div>
      <div className="fixed left-0 hidden w-16 h-screen py-8 space-y-6 overflow-y-auto transition-transform bg-white border-r scrollwidth dark:bg-black border-slate-500/40 dark:border-slate-800 sm:block lg:hidden">
        <div
          className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/friends" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}
        >
          <Link to={"/friends"}>
            <BsPeopleFill size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/explore" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/explore"}>
            <FcOvertime size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/posts" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/posts"}>
            <Image size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/watch" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/watch"}>
            <PlaySquare size={28} color="#2f76ac" />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/tweets" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/tweets"}>
            <ClipboardList color="#2f76ac" size={28} />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/marketplace" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/marketplace"}>
            <Store color="#2f76ac" size={28} />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/saved" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/saved"}>
            <SaveAll color="#2f76ac" size={28} />
          </Link>
        </div>
        <div className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
            pathname === "/messages" ? "dark:bg-slate-400/10 bg-slate-400/25 " : ""
          }`}>
          <Link to={"/messages"}>
            <MessagesSquare color="#2f76ac" size={28} />
          </Link>
        </div>
        <div className="h-10"></div>
      </div>
      <Outlet />
    </>
  );
};

export default SideNavbar;
