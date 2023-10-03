import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { PlaySquare, X } from "lucide-react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
const secret = process.env.REACT_APP_SECRET;

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
  const [imagecaptionpost, setimagecaptionpost] = useState(false);
  const [isVideo, setisVideo] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [token, settoken] = useState("");
  const [ismounted, setisMounted] = useState(false);
  const [fileadd, setfileadd] = useState(null);
  const [tags, settags] = useState([]);
  const [texttag,settexttag] = useState("")
  const [caption,setcaption] = useState("")
  const [posttag,setposttag] = useState([])
  const [posttagdata,setposttagdata] = useState("");

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
      setfileadd(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setUploadfile(readerEvent.target.result);
      setuploadfilebar(true);
    };
  };
  const uploadtextPost = async () => {
    if (isLoading) {
      toast.error("Uploading in progress plese do not turn off window");
      return;
    }
    try {
      setisLoading(true);
      const responce = await toast.promise(
        fetch(`${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/posttweet`, {
          method: "POST",
          body: JSON.stringify({
            token: token,
            secret: secret,
            tweet: textpostitem,
            hashtags: tags,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        {
          loading: "Uploading tweet",
          error: <b>Failed to upload</b>,
        }
      );
      if (!responce.ok) {
        toast.error("Network error accured!");
        return;
      }
      const data = await responce.json();
      if (data.success) {
        toast.success(data?.message);
        settextpostitem("");
        setisLoading(false);
        setuploadimagemodalanimation(false);
        setUploadfile(null);
        setTimeout(() => {
          setuploadimagemodal(false);
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
        toast.error("Network error accured!");
        return;
      }
      const data = await responce.json();
      if (data.success) {
        try {
          const responceimg = await toast.promise(
            fetch(
              `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/postimage`,
              {
                method: "POST",
                body: JSON.stringify({
                  token: token,
                  secret: secret,
                  caption: caption,
                  hashtags: posttag,
                  imageLink: data.url,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
            {
              loading: "Post data uploading",
              success: "Post data uploaded",
              error: <b>Failed to upload</b>,
            }
          );
          if (!responceimg.ok) {
            toast.error("Network error accured!");
            return;
          }
          const dataadd = await responceimg.json();
          if (dataadd.success) {
            toast.success(dataadd?.message);
            settextpostitem("");
            setisLoading(false);
            setuploadimagemodalanimation(false);
            setUploadfile(null);
            setTimeout(() => {
              setuploadimagemodal(false);
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

  const uploadVideo = async () => {
    if (fileadd == null) {
      toast.error("Please select file");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileadd);
    try {
      setisLoading(true);
      const responce = await toast.promise(
        fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/uploadvideofile`,
          {
            method: "POST",
            body: formData,
          }
        ),
        {
          loading: "Video Uploading",
          success: "Video uploaded",
          error: <b>Failed to upload</b>,
        }
      );
      if (!responce.ok) {
        toast.error("Network error accured!");
        return;
      }
      const data = await responce.json();
      if (data.success) {
        try {
          const responcevideo = await toast.promise(
            fetch(
              `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/postvideo`,
              {
                method: "POST",
                body: JSON.stringify({
                  token: token,
                  secret: secret,
                  caption: caption,
                  hashtags: posttag,
                  videoLink: data.url,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
            {
              loading: "Video data uploading",
              success: "Video data uploaded",
              error: <b>Failed to upload</b>,
            }
          );
          if (!responcevideo.ok) {
            toast.error("Network error accured!");
          }
          const dataadd = await responcevideo.json();
          if (dataadd.success) {
            toast.success(dataadd?.message);
            settextpostitem("");
            setisLoading(false);
            setuploadimagemodalanimation(false);
            setUploadfile(null);
            setTimeout(() => {
              setuploadimagemodal(false);
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
          setuploadimagemodalanimation(false);
          setTimeout(() => {
            setuploadimagemodal(false);
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
                        Drag photos and video here
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
                        <div className="flex items-center justify-center my-3">
                          <h1
                            onClick={() => {
                              settextpost(true);
                            }}
                            className="inline-block w-full max-w-xs px-5 py-2 mx-5 font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer"
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
                              className="inline-block w-full max-w-xs px-5 py-2 mx-5 font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer"
                            >
                              Go Forward
                            </h1>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  {uploadfilebar && (
                    !imagecaptionpost ? 
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
                        {!isVideo && (
                          <img
                            src={uploadfile}
                            className="w-full h-full"
                            alt=""
                          />
                        )}
                        {isVideo && (
                          <video
                            controls
                            autoPlay={true}
                            className="w-full h-full"
                          >
                            <source src={uploadfile} />
                          </video>
                        )}
                      </div>
                      <div
                        className="absolute bottom-0 right-0"
                        style={{ zIndex: 60 }}
                      >
                        <h1
                          onClick={() => {
                            setimagecaptionpost(true);
                            // setuploadfilebar(false)
                          }}
                          className=" cursor-pointer bg-blue-600 px-3 py-1.5 text-white font-semibold rounded-lg"
                        >
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
                    </motion.div> : 
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
                          setimagecaptionpost(false)
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
                        <BiArrowBack
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>

                    <div className="items-center justify-center transition-all border-green-200 md:mx-auto">
                      <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
                        Post Description
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
                        className="items-center justify-center cursor-pointer md:hidden"
                      >
                        <AiOutlineClose
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-full overflow-hidden ">
                   
                    <div className="mx-4 mt-4">
                      <div className="relative py-1 w-full min-w-[200px]">
                        <textarea
                          value={caption}
                          onChange={(e) => {
                            setcaption(e.target.value);
                          }}
                          className=" h-full min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline dark:text-white outline-0 transition-all border focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 dark:border-neutral-600"
                          placeholder="What is happening?!"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mx-4">
                      <div className="relative py-1 w-full min-w-[200px]">
                      {posttag.length !== 0 && (
                          <div className="flex mx-4 mb-2 space-x-2">
                            {posttag.map((item, ind) => {
                              return (
                                <h1
                                  key={ind}
                                  className="bg-slate-400 py-0.5 px-2 rounded-full flex space-x-5 items-center"
                                >
                                  {item}
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                    posttag.splice(ind, 1)
                                     setposttag([...posttag]);
                                    }}
                                  >
                                    <X size={20} />
                                  </span>
                                </h1>
                              );
                            })}
                          </div>
                        )}
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && posttag.length < 5 && e.target.value.length > 1) {
                              setposttag([...posttag, e.target.value]);
                              setposttagdata("")
                            }
                          }}
                          onChange={(e)=>{
                            setposttagdata(e.target.value)
                          }}
                          value={posttagdata}
                          className="h-full  min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent dark:text-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all border dark:border-neutral-600 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder="Add tags name and press enter"
                        ></input>
                      </div>
                    </div>
                    <div className="mt-2">
                      {!isLoading ? (
                        <h1
                          onClick={() => {
                            if (!isVideo) {
                              uploadImage();
                            } else {
                              uploadVideo();
                            }
                          }}
                          className="w-full max-w-xs py-2 mx-auto font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer"
                        >
                          Post
                        </h1>
                      ) : (
                        <h1 className="flex justify-center w-full max-w-xs py-2 mx-auto font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer">
                          <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="23"
                            visible={true}
                          />
                        </h1>
                      )}
                    </div>
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
                        className="items-center justify-center cursor-pointer"
                      >
                        <BiArrowBack
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>

                    <div className="items-center justify-center transition-all border-green-200 md:mx-auto">
                      <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
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
                        className="items-center justify-center cursor-pointer md:hidden"
                      >
                        <AiOutlineClose
                          color={themeMode === "dark" ? "white" : "black"}
                          size={24}
                        />
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-full overflow-hidden ">
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
                    <div className="mx-4">
                      <div className="relative py-1 w-full min-w-[200px]">
                      {tags.length !== 0 && (
                          <div className="flex mx-4 mb-2 space-x-2">
                            {tags.map((item, ind) => {
                              return (
                                <h1
                                  key={ind}
                                  className="bg-slate-400 py-0.5 px-2 rounded-full flex space-x-5 items-center"
                                >
                                  {item}
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                    tags.splice(ind, 1)
                                    console.log(ind);
                                     settags([...tags]);
                                     console.log(tags,[...tags]);
                                    }}
                                  >
                                    <X size={20} />
                                  </span>
                                </h1>
                              );
                            })}
                          </div>
                        )}
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && tags.length < 5 && e.target.value.length > 1) {
                              settags([...tags, e.target.value]);
                              settexttag("")
                            }
                          }}
                          onChange={(e)=>{
                            settexttag(e.target.value)
                          }}
                          value={texttag}
                          className="h-full  min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent dark:text-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all border dark:border-neutral-600 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder="Add tags name and press enter"
                        ></input>
                      </div>
                    </div>
                    <div className="mt-2">
                      {!isLoading ? (
                        <h1
                          onClick={() => {
                            uploadtextPost();
                          }}
                          className="w-full max-w-xs py-2 mx-auto font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer"
                        >
                          Post
                        </h1>
                      ) : (
                        <h1 className="flex justify-center w-full max-w-xs py-2 mx-auto font-semibold text-center text-white bg-blue-600 rounded-lg cursor-pointer">
                          <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="23"
                            visible={true}
                          />
                        </h1>
                      )}
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
