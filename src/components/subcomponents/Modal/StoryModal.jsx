import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { PlaySquare, X } from "lucide-react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
const secret = process.env.REACT_APP_SECRET;

const AddStoryComp = () => {
  const {
    setstoryModal,
    storyModalanimation,
    setstoryModalanimation,
    themeMode,
  } = useContext(Theme);
  const fileref = useRef(null);
  const [uploadfilebar, setuploadfilebar] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [token, settoken] = useState("");
  const [ismounted, setisMounted] = useState(false);
  const [fileadd, setfileadd] = useState(null);
  const profile = useSelector((state)=>state.setUser)

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
    if (e.target.files[0].type.includes("video")) {
      toast.error("Video not allowed!");
      return;
    }
    if (e.target.files[0]) {
      setfileadd(e.target.files[0]);
      setuploadfilebar(true)
    }
  };

  const uploadImage = async () => {
    if (fileadd == null) {
      toast.error("Please select file");
      return;
    }
    if (isLoading) {
      toast.error("Uploading in progress plese do not turn off window");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileadd);
    try {
      setisLoading(true);
      const responce = await toast.promise(
        fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/uploadImage`,
          {
            method: "POST",
            body: formData,
          }
        ),
        {
          loading: "Image Uploading",
          success: "Image uploaded",
          error: <b>Failed to upload</b>,
        }
      );
      if (!responce.ok) {
        setisLoading(false)
        toast.error("Network error accured!");
        return;
      }
      const data = await responce.json();
      if (data.success) {
        try {
           
          const responceimg = await toast.promise(
            fetch(
              `${process.env.REACT_APP_LOCALHOST_KEY}/api/story/addstory`,
              {
                method: "POST",
                body: JSON.stringify({
                  token: token,
                  secret: secret,
                  imageLink: data.url,
                  userId:profile._id
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
            {
              loading: "Story uploading",
              success: "Story uploading",
              error: <b>Failed to upload</b>,
            }
          );
          console.log(responceimg);
          if (!responceimg.ok) {
            toast.error("Network error accured!");
            setisLoading(false)
            return;
          }
          const dataadd = await responceimg.json();
          if (dataadd.success) {
            toast.success(dataadd?.message);
            setisLoading(false);
            setstoryModalanimation(false);
            setTimeout(() => {
              setstoryModal(false);
            }, 500);
          } else {
            toast.error(data?.message + "He;;");
            setisLoading(false);
          }
          setisLoading(false);
        } catch (error) {
          toast.error("Some error accured oka");
          setisLoading(false);
        }
      } else {
        toast.error(data?.message + "sdfg");
        setisLoading(false);
      }
      setisLoading(false);
    } catch (error) {
      toast.error("Some error accured here");
      setisLoading(false);
    }
  };

  if (!ismounted) return;
  return (
    <div
      className="fixed w-screen h-screen selection:bg-none modal-backdrop"
      style={{ zIndex: 150 }}
    >
      <div
        onClick={() => {
          setstoryModalanimation(false);
          setTimeout(() => {
            setstoryModal(false);
          }, 500);
        }}
        className="fixed hidden cursor-pointer md:flex right-10 top-5 modal-backdrop"
      >
        <AiOutlineClose
          color={themeMode === "dark" ? "white" : "black"}
          size={30}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <AnimatePresence>
          {storyModalanimation && (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              className={`h-[570px] rounded-lg mx-3 max-w-xl w-full shadow-inner dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white `}
            >
                <div>
                  <div
                    className={`h-12 border-b items-center flex justify-between border-slate-300 dark:border-slate-800 px-3`}
                  >
                    {uploadfilebar && (
                      <div className="items-center">
                        <motion.div
                          onClick={() => {
                            setuploadfilebar(false);
                          }}
                          initial={{ x: 100, y: -100 }}
                          animate={{ x: 0, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0,
                            ease: [0, 0.71, 0.2, 1.01],
                          }}
                          exit={{
                            x: 100,
                            y: -100,
                          }}
                          className="items-center justify-center cursor-pointer"
                        >
                          <BiArrowBack
                            color={themeMode === "dark" ? "white" : "black"}
                            size={24}
                          />
                        </motion.div>
                      </div>
                    )}
                    <div className="items-center justify-center transition-all border-green-200 md:mx-auto">
                      <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
                        Add story
                      </h1>
                    </div>
                    <div>
                      <motion.div
                        onClick={() => {
                          setstoryModalanimation(false);
                          setTimeout(() => {
                            setstoryModal(false);
                          }, 500);
                        }}
                        initial={{ x: 100, y: -100 }}
                        animate={{ x: 0, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0,
                          ease: [0, 0.71, 0.2, 1.01],
                        }}
                        exit={{
                          x: 100,
                          y: -100,
                        }}
                        className="items-center justify-center cursor-pointer md:hidden"
                      >
                        <AiOutlineClose
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {!uploadfilebar && (
                    <motion.div
                      initial={{ x: -300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      exit={{
                        x: 300,
                        opacity: 0,
                      }}
                      className="h-[500px] items-center justify-center flex flex-col"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="flex">
                          <FiImage
                            size={100}
                            color={themeMode === "dark" ? "white" : "black"}
                            className="-mr-4 -rotate-6"
                          />
                          <PlaySquare
                            size={100}
                            color={themeMode === "dark" ? "white" : "black"}
                            className="mt-5 -ml-3 rotate-6 "
                          />
                        </div>
                      </div>
                      <input
                        onChange={addFiletovar}
                        type="file"
                        ref={fileref}
                        name=""
                        id=""
                        className="hidden"
                      />
                      <h1 className="mx-auto text-lg text-center text-black dark:text-white">
                        Drag photos here
                      </h1>
                      <div className="w-full">
                        <div className="flex items-center justify-center w-full my-3">
                          <h1
                            onClick={selectFile}
                            className="inline-block w-full max-w-xs px-5 py-2 mx-5 font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer"
                          >
                            Select from device
                          </h1>
                        </div>
                        {/* <div className="flex items-center justify-center my-3">
                    <h1 className="inline-block w-full max-w-xs px-5 py-2 mx-5 font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer">
                      Select video
                    </h1>
                  </div> */}
                        {fileadd !== null && (
                          <div className="flex items-center justify-center my-3">
                            <h1
                              onClick={() => {
                                setuploadfilebar(true);
                              }}
                              className="inline-block w-full max-w-xs px-5 py-2 mx-5 font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer"
                            >
                              Go Forward
                            </h1>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  {uploadfilebar &&
                    (
                      <motion.div
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0,
                          ease: [0, 0.71, 0.2, 1.01],
                        }}
                        exit={{
                          x: 300,
                        }}
                        className="h-[520px] relative flex flex-col items-center justify-center overflow-hidden"
                      >
                      <div className="flex flex-col items-center justify-center object-cover mx-0 overflow-hidden rounded-lg">
                          <img
                            src={fileadd && URL.createObjectURL(fileadd)}
                            className="w-full h-full"
                            alt=""
                          />
                          </div>
                        <div
                          className="absolute bottom-0 right-0"
                          style={{ zIndex: 60 }}
                        >
                          <h1
                            onClick={() => {
                              // setuploadfilebar(false)
                              uploadImage()
                            }}
                            className=" cursor-pointer bg-blue-600 px-3 py-1.5 text-white font-semibold rounded-lg"
                          >
                            Add story
                          </h1>
                        </div>
                       
                      </motion.div>
                   )}
                </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddStoryComp;
