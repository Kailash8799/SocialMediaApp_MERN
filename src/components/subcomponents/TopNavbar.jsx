import { useEffect, useState, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { GoHome, GoHomeFill } from "react-icons/go";
import { SiAddthis } from "react-icons/si";
import {
  AiOutlineYoutube,
  AiFillYoutube,
  AiOutlineShop,
  AiFillShop,
} from "react-icons/ai";
import { Theme } from "../context/ThemeProvider";
import LoadingBar from "react-top-loading-bar";

const TopNavbar = () => {
  const [mounted, setMounted] = useState(false);
  const {
    themeMode,
    progress,
    setProgress,
    setuploadimagemodal,
    setuploadimagemodalanimation,
    setsidebarModal,
    setsidebarModalanimation,
    setleftsidebarModal,
    setleftsidebarModalanimation,
  } = useContext(Theme);
  const { pathname } = useLocation();
  useEffect(() => {
    setMounted(true);
  }, []);
  // if (window !== undefined) {
  //   var prevScrollpos = window.pageYOffset;
  //   window.onscroll = function () {
  //     var currentScrollPos = window.pageYOffset;
  //     if (prevScrollpos > currentScrollPos) {
  //       document.getElementById("topNav").style.top = "0";
  //     } else {
  //       document.getElementById("topNav").style.top = "-48px";
  //     }
  //     prevScrollpos = currentScrollPos;
  //   };
  // }
  if (!mounted) return;
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {pathname !== "/signup" &&
        pathname !== "/signin" &&
        pathname !== "/forgot" &&
        pathname !== "/verifyuser" && (
          <div
            id="topNav"
            style={{ zIndex: 100 }}
            className="sticky top-0 left-0 right-0 w-full h-16 transition-all bg-white border-b dark:bg-black border-slate-500/40 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mx-3">
              <div className="items-center cursor-pointer">
                <Link to={"/"}>
                  <h1
                    className="items-center py-4 text-xl font-bold text-black dark:text-white"
                  >
                    SocialMedia
                  </h1>
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <div className="items-center hidden space-x-10 sm:flex">
                  <Link to={"/"}>
                    <h1
                      className={`text-xl font-bold py-4 px-5 ${
                        pathname === "/" ? "border-b-[3px] border-blue-700" : ""
                      }  cursor-pointer`}
                    >
                      {pathname !== "/" ? (
                        <GoHome
                          size={30}
                          color={themeMode === "dark" ? "#fff" : "black"}
                        />
                      ) : (
                        <GoHomeFill size={30} color="blue" />
                      )}
                    </h1>
                  </Link>
                  <Link to={"/friends"}>
                    <h1
                      className={`text-xl py-4 font-bold px-5 ${
                        pathname === "/friends"
                          ? "border-b-[3px]  border-blue-700"
                          : ""
                      }  cursor-pointer`}
                    >
                      {pathname !== "/friends" ? (
                        <BsPeople
                          size={30}
                          color={themeMode === "dark" ? "#fff" : "black"}
                        />
                      ) : (
                        <BsPeopleFill size={30} color="blue" />
                      )}
                    </h1>
                  </Link>
                  <Link to={"/watch"}>
                    <h1
                      className={`text-xl py-[15px] px-5 font-bold ${
                        pathname === "/watch"
                          ? "border-b-[3px] border-blue-700"
                          : ""
                      }  cursor-pointer`}
                    >
                      {pathname !== "/watch" ? (
                        <AiOutlineYoutube
                          size={32}
                          color={themeMode === "dark" ? "#fff" : "black"}
                        />
                      ) : (
                        <AiFillYoutube size={32} color="blue" />
                      )}
                    </h1>
                  </Link>
                  <Link to={"/marketplace"}>
                    <h1
                      className={`text-xl py-4 font-bold px-5 ${
                        pathname === "/marketplace"
                          ? "border-b-[3px] border-blue-700"
                          : ""
                      }  cursor-pointer`}
                    >
                      {pathname !== "/marketplace" ? (
                        <AiOutlineShop
                          size={30}
                          color={themeMode === "dark" ? "#fff" : "black"}
                        />
                      ) : (
                        <AiFillShop size={30} color="blue" />
                      )}
                    </h1>
                  </Link>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between space-x-3">
                <div
                  onClick={() => {
                    setuploadimagemodalanimation(true);
                    setuploadimagemodal(true);
                  }}
                  className="items-center block py-4 cursor-pointer"
                >
                  <SiAddthis
                    size={23}
                    color={themeMode === "dark" ? "#fff" : "black"}
                  />
                </div>
                <div
                  onClick={() => {
                    setleftsidebarModalanimation(true);
                    setleftsidebarModal(true);
                  }}
                  className="items-center block py-4 cursor-pointer sm:hidden"
                >
                  <HiOutlineMenuAlt1
                    size={30}
                    color={themeMode === "dark" ? "#fff" : "black"}
                  />
                </div>
                <div
                  className="py-4 cursor-pointer"
                  onClick={() => {
                    setsidebarModalanimation(true);
                    setsidebarModal(true);
                    // setisLoggedin(false);
                    // localStorage.removeItem("userlogintoken");
                    // navigate("/", { replace: true });
                  }}
                >
                  <BiSolidUserCircle
                    size={30}
                    color={themeMode === "dark" ? "#fff" : "black"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      <Outlet />
    </>
  );
};

export default TopNavbar;
