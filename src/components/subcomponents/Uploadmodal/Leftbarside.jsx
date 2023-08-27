import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import { FcOvertime } from "react-icons/fc";
import {
  ClipboardList,
  Image,
  MessagesSquare,
  PlaySquare,
  SaveAll,
  Store,
} from "lucide-react";

const LeftSidebarModal = () => {
  const {
    themeMode,
    setleftsidebarModal,
    leftsidebarModalanimation,
    setleftsidebarModalanimation,
  } = useContext(Theme);

  const [ismounted, setisMounted] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setisMounted(true);
    return ()=>{
        setisMounted(false)
    }
  }, []);

  if (!ismounted) return;
  return (
    <div
      className="fixed w-screen h-screen selection:bg-none modal-backdrop"
      style={{ zIndex: 150 }}
      onClick={() => {
        setleftsidebarModalanimation(false);
        setTimeout(() => {
          setleftsidebarModal(false);
        }, 500);
      }}
    >
      <div className="flex items-center justify-start w-full h-full">
        <AnimatePresence>
          {leftsidebarModalanimation && (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              exit={{
                opacity: 0,
                x: -300,
              }}
              className={`h-full rounded-lg  max-w-sm w-full shadow-inner dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white `}
            >
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                exit={{
                  x: -100,
                }}
              >
                <div
                  className={`h-12 border-b items-center flex justify-between border-slate-300 dark:border-slate-800 px-7`}
                >
                  <div className="items-center justify-center mx-auto transition-all border-green-200">
                    <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
                      Welcome kailash
                    </h1>
                  </div>
                  <div>
                    <motion.div
                      onClick={() => {
                        setleftsidebarModalanimation(false);
                        setTimeout(() => {
                          setleftsidebarModal(false);
                        }, 500);
                      }}
                      initial={{ x: -100 }}
                      animate={{ x: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      exit={{
                        x: -100,
                      }}
                      className="items-center justify-center cursor-pointer"
                    >
                      <AiOutlineClose
                        color={themeMode === "dark" ? "white" : "black"}
                        size={24}
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="w-full mt-3 space-y-5 overflow-y-auto px-7">
                  <div
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
                    className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
                      pathname === "/friends"
                        ? "dark:bg-slate-400/10 bg-slate-400/25 "
                        : ""
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
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
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
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
                    className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
                      pathname === "/posts"
                        ? "dark:bg-slate-400/10 bg-slate-400/25 "
                        : ""
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
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
                    className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
                      pathname === "/watch"
                        ? "dark:bg-slate-400/10 bg-slate-400/25 "
                        : ""
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
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
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
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
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
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
                    className={`px-3 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25 ${
                      pathname === "/saved"
                        ? "dark:bg-slate-400/10 bg-slate-400/25 "
                        : ""
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
                  <div
                    onClick={() => {
                      setleftsidebarModalanimation(false);
                      setTimeout(() => {
                        setleftsidebarModal(false);
                      }, 500);
                    }}
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
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeftSidebarModal;
