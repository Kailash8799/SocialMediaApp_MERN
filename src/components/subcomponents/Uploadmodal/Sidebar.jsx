import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { PlaySquare } from "lucide-react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
const secret = process.env.REACT_APP_SECRET;

const SidebarModal = () => {
  const {
    uploadfile,
    setUploadfile,
    setsidebarModal,
    sidebarModalanimation,
    setsidebarModalanimation,
    themeMode,
  } = useContext(Theme);
  const fileref = useRef(null);
  const [uploadfilebar, setuploadfilebar] = useState(false);
  const [textpostitem, settextpostitem] = useState("");
  const [textpost, settextpost] = useState(false);
  const [isVideo, setisVideo] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [token, settoken] = useState("");
  const [ismounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
    const tk = localStorage.getItem("userlogintoken");
    if (tk) {
      settoken(tk);
    }
  }, []);
  const selectFile = (e) => {
    e.preventDefault();
    fileref.current.click();
  };
  const addFiletovar = async (e) => {
    const reader = new FileReader();
    setisVideo(false);
    if (e.target.files[0].type.includes("video")) {
      setisVideo(true);
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setUploadfile(readerEvent.target.result);
      setuploadfilebar(true);
    };
  };
  const uploadtextPost = async () => {
    try {
      setisLoading(true);
      const responce = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/posttweet`,
        {
          method: "POST",
          body: JSON.stringify({
            token: token,
            secret: secret,
            tweet: textpostitem,
            hashtags: ["Hello", "Hii"],
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await responce.json();
      if (data.success) {
        toast.success(data?.message);
        settextpostitem("");
        setisLoading(false);
        setsidebarModalanimation(false);
        setUploadfile(null);
        setTimeout(() => {
          setsidebarModal(false);
        }, 500);
      } else {
        toast.error(data?.message);
        setisLoading(false);
      }
      setisLoading(false);
    } catch (error) {
      toast.error("Some error accured");
      setisLoading(false);
    }
  };
  if (!ismounted) return;
  return (
    <div
      className="selection:bg-none fixed h-screen w-screen modal-backdrop"
      style={{ zIndex: 150 }}
      onClick={() => {
        setsidebarModalanimation(false);
        setTimeout(() => {
          setsidebarModal(false);
        }, 500);
      }}
    >
      <div className="h-full w-full flex items-center justify-end">
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
                  <div className="items-center transition-all mx-auto border-green-200 justify-center">
                    <h1 className="text-center transition-all inline-block font-semibold text-black dark:text-white">
                      Create new text post
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
                      className="cursor-pointer items-center justify-center"
                    >
                      <AiOutlineClose
                        color={themeMode === "dark" ? "white" : "black"}
                        size={24}
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="px-7 w-full overflow-hidden"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarModal;
