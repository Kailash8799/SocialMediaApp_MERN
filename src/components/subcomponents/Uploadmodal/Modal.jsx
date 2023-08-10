import React, { useContext, useRef, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { PlaySquare } from "lucide-react";
import { BiArrowBack } from "react-icons/bi";

const Modal = () => {
  const {
    uploadfile,
    setUploadfile,
    setuploadimagemodal,
    uploadimagemodalanimation,
    setuploadimagemodalanimation,
    themeMode,
  } = useContext(Theme);
  const fileref = useRef(null);
  const [uploadfilebar, setuploadfilebar] = useState(false);
  const [textpostitem, settextpostitem] = useState("");
  const [textpost, settextpost] = useState(false);
  const selectFile = (e) => {
    e.preventDefault();
    fileref.current.click();
  };
  const addFiletovar = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setUploadfile(readerEvent.target.result);
      setuploadfilebar(true);
    };
  };
  return (
    <div
      className="selection:bg-none fixed h-screen w-screen modal-backdrop"
      style={{ zIndex: 150 }}
    >
      <div
        onClick={() => {
          setuploadimagemodalanimation(false);
          setTimeout(() => {
            setuploadimagemodal(false);
          }, 500);
        }}
        className="fixed hidden md:flex right-10 top-5 modal-backdrop cursor-pointer"
      >
        <AiOutlineClose
          color={themeMode === "dark" ? "white" : "black"}
          size={30}
        />
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <AnimatePresence>
          {uploadimagemodalanimation && (
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
              {!textpost && (
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
                          className="cursor-pointer items-center justify-center"
                        >
                          <BiArrowBack
                            color={themeMode === "dark" ? "white" : "black"}
                            size={24}
                          />
                        </motion.div>
                      </div>
                    )}
                    <div className="items-center transition-all md:mx-auto border-green-200 justify-center">
                      <h1 className="text-center transition-all inline-block font-semibold text-black dark:text-white">
                        Create new post
                      </h1>
                    </div>
                    <div>
                      <motion.div
                        onClick={() => {
                          setuploadimagemodalanimation(false);
                          setTimeout(() => {
                            setuploadimagemodal(false);
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
                        className="cursor-pointer items-center justify-center md:hidden"
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
                      <div className="relative items-center justify-center flex">
                        <div className="flex">
                          <FiImage
                            size={100}
                            color={themeMode === "dark" ? "white" : "black"}
                            className="-mr-4 -rotate-6"
                          />
                          <PlaySquare
                            size={100}
                            color={themeMode === "dark" ? "white" : "black"}
                            className="-ml-3 rotate-6 mt-5 "
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
                      <h1 className="mx-auto text-center text-black dark:text-white text-lg">
                        Drag photos and video here
                      </h1>
                      <div className="w-full">
                        <div className="flex w-full items-center justify-center my-3">
                          <h1
                            onClick={selectFile}
                            className="inline-block cursor-pointer max-w-xs font-semibold text-white w-full mx-5 text-center bg-blue-600 py-2 px-5 rounded-lg"
                          >
                            Select from device
                          </h1>
                        </div>
                        {/* <div className="flex items-center justify-center my-3">
                    <h1 className="inline-block cursor-pointer max-w-xs font-semibold text-white w-full mx-5 text-center bg-blue-600 py-2 px-5 rounded-lg">
                      Select video
                    </h1>
                  </div> */}
                        <div className="flex items-center justify-center my-3">
                          <h1
                            onClick={() => {
                              settextpost(true);
                            }}
                            className="inline-block cursor-pointer max-w-xs font-semibold text-white w-full mx-5 text-center bg-blue-600 py-2 px-5 rounded-lg"
                          >
                            Write text
                          </h1>
                        </div>
                        {uploadfile !== null && (
                          <div className="flex items-center justify-center my-3">
                            <h1
                              onClick={() => {
                                setuploadfilebar(true);
                              }}
                              className="inline-block cursor-pointer max-w-xs font-semibold text-white w-full mx-5 text-center bg-blue-600 py-2 px-5 rounded-lg"
                            >
                              Go Forward
                            </h1>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  {uploadfilebar && (
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
                      <div className="items-center  mx-0 rounded-lg overflow-hidden object-cover justify-center flex flex-col">
                        <img
                          src={uploadfile}
                          className="w-full h-full"
                          alt=""
                        />
                      </div>
                      <div
                        className="absolute bottom-0 right-0"
                        style={{ zIndex: 60 }}
                      >
                        <h1 className=" bg-blue-600 px-3 py-1.5 text-white font-semibold rounded-lg">
                          Next
                        </h1>
                      </div>
                      <div
                        className="absolute bottom-0 left-0"
                        style={{ zIndex: 60 }}
                      >
                        <h1 className=" bg-blue-600 px-3 py-1.5 text-white font-semibold rounded-lg">
                          Crop
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
              {textpost && (
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
                    className={`h-12 border-b items-center flex justify-between border-slate-300 dark:border-slate-800 px-3`}
                  >
                    <div className="items-center">
                      <motion.div
                        onClick={() => {
                          settextpost(false);
                          setuploadfilebar(false);
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
                        <BiArrowBack
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>

                    <div className="items-center transition-all md:mx-auto border-green-200 justify-center">
                      <h1 className="text-center transition-all inline-block font-semibold text-black dark:text-white">
                        Create new text post
                      </h1>
                    </div>
                    <div>
                      <motion.div
                        onClick={() => {
                          setuploadimagemodalanimation(false);
                          setTimeout(() => {
                            setuploadimagemodal(false);
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
                        className="cursor-pointer items-center justify-center md:hidden"
                      >
                        <AiOutlineClose
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>
                  </div>
                  <div className=" w-full overflow-hidden">
                    <div className="mt-3 ml-4">
                      <img
                        src="https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
                        className="transition border-none rounded-full w-11 h-11 hover:scale-105"
                        alt=""
                      />
                    </div>
                    <div className="mx-4 mt-4">
                      <div className="relative py-1 w-full min-w-[200px]">
                        <textarea
                          value={textpostitem}
                          onChange={(e) => {
                            settextpostitem(e.target.value);
                          }}
                          className=" h-full min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline dark:text-white outline-0 transition-all border focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 dark:border-neutral-600"
                          placeholder="What is happening?!"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mx-4 mt-2">
                      <div className="relative py-1 w-full min-w-[200px]">
                        <textarea
                          className=" h-full min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent dark:text-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all border dark:border-neutral-600 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder="Add tags"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h1 className="text-center cursor-pointer text-white font-semibold py-2 rounded-lg  max-w-xs w-full bg-blue-600 mx-auto">
                        Post
                      </h1>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modal;
