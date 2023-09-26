import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Moon, SunMoon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarModal = () => {
  const {
    ChangeTheme,
    setsidebarModal,
    sidebarModalanimation,
    setsidebarModalanimation,
    themeMode,
    setisLoggedin
  } = useContext(Theme);
  const [ismounted, setisMounted] = useState(false);
  const [toggle, settoggle] = useState(
    themeMode === "dark" ? "light" : themeMode
  );
  const profile = useSelector((state) => state.setUser);
  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!ismounted) return;
  return (
    <div
      className="fixed w-screen h-screen selection:bg-none modal-backdrop"
      style={{ zIndex: 150 }}
      onClick={() => {
        setsidebarModalanimation(false);
        setTimeout(() => {
          setsidebarModal(false);
        }, 500);
      }}
    >
      <div className="flex items-center justify-end w-full h-full">
        <AnimatePresence>
          {sidebarModalanimation && (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              exit={{
                opacity: 0,
                x: 300,
              }}
              className={`h-full rounded-lg  max-w-sm w-full shadow-inner dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white `}
            >
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                exit={{
                  x: 100,
                }}
              >
                <div
                  className={`h-12 border-b items-center flex justify-between border-slate-300 dark:border-slate-800 px-7`}
                >
                  <div className="items-center justify-center mx-auto transition-all border-green-200">
                    <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
                      Welcome
                    </h1>
                  </div>
                  <div>
                    <motion.div
                      onClick={() => {
                        setsidebarModalanimation(false);
                        setTimeout(() => {
                          setsidebarModal(false);
                        }, 500);
                      }}
                      initial={{ x: 100 }}
                      animate={{ x: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      exit={{
                        x: 100,
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
                <div className="w-full overflow-y-auto px-7">
                  <div
                    className={`px-3 mt-5 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25`}
                  >
                    <div  onClick={() => {
                      settoggle(themeMode)
                      ChangeTheme();
                    }} className="flex flex-row items-center space-x-2 ">
                      {themeMode === "dark" ? (
                        <SunMoon size={28} color="#2f76ac" />
                      ) : (
                        <Moon size={28} color="#2f76ac" />
                      )}
                      <h1 className="text-xl font-bold text-black/70 dark:text-white">
                        Toggle to {toggle}
                      </h1>
                    </div>
                  </div>
                  <div
                    className={`px-3 mt-5 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25`}
                  >
                    <Link to={`/profile/${profile?.username}`}><div className="flex flex-row items-center space-x-2 ">
                      {themeMode === "dark" ? (
                        <SunMoon size={28} color="#2f76ac" />
                      ) : (
                        <Moon size={28} color="#2f76ac" />
                      )}
                      <h1 className="text-xl font-bold text-black/70 dark:text-white">
                        Profile
                      </h1>
                    </div>
                  </Link>
                  </div>
                  <div
                    className={`px-3 mt-5 py-3 mx-2 rounded-lg cursor-pointer hover:dark:bg-slate-400/10 hover:bg-slate-400/25`}
                  >
                    <div  onClick={() => {
                        localStorage.removeItem("userlogintoken")
                        setisLoggedin(false)
                    }} className="flex flex-row items-center space-x-2 ">
                      {themeMode === "dark" ? (
                        <SunMoon size={28} color="#2f76ac" />
                      ) : (
                        <Moon size={28} color="#2f76ac" />
                      )}
                      <h1 className="text-xl font-bold text-black/70 dark:text-white">
                        Logout
                      </h1>
                    </div>
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

export default SidebarModal;
