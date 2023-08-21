import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import SideNavbar from "./subcomponents/SideNavbar";
import { PuffLoader } from "react-spinners";
import Moment from "react-moment";
import Profileimage from "./subcomponents/Profileimage";
import {
  ArrowDownToLine,
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  X,
} from "lucide-react";
import { Theme } from "./context/ThemeProvider";
import { useContext } from "react";
import moment from "moment-timezone";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";

const Postdetails = () => {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [postDetails, setPostdetails] = useState({});
  const [openPopup, setopenPopup] = useState(false);
  const { themeMode } = useContext(Theme);
  const [isLiked, setisLiked] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [token, settoken] = useState("");
  const [comment,setcomment] = useState("")

  useEffect(() => {
    setMounted(true);
    let tkn = localStorage.getItem("userlogintoken");
    if (tkn) {
      settoken(tkn);
    }
    (async () => {
      setFetching(true);
      try {
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/getParticularpost`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
              id: id,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const posts = await postsdata.json();
        if (posts?.success) {
          console.log(posts?.posts);
          setPostdetails(posts?.posts);
          toast.success(posts?.message);
          setFetching(false);
        } else {
          toast.error(posts?.message);
          setFetching(false);
        }
      } catch (error) {
        toast.success("Error");
        setFetching(false);
      }
    })();
  }, [id]);
  if (!mounted) <div className="dark:bg-black bg-white min-h-screen"></div>;

  const postComment = async()=>{
    setisUploading(true)
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/postimagecomment`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
            comment:comment
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setcomment("")
        setisUploading(false)
      } else {
        toast.error(posts?.message);
        setisUploading(false);
      }
    } catch (error) {
      toast.success("Error");
      setisUploading(false);
    }
  }
  return (
    <>
      <SideNavbar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4 epx:w-3/4">
            <div className="items-center selection:bg-none justify-center w-full py-3 mx-auto space-y-1 rounded-md shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 sm:mx-0 sm:max-w-xl">
              <div className="flex px-1.5 items-center justify-between h-12">
                <div className="flex items-center justify-center space-x-3">
                  <div className="cursor-pointer">
                    <div className="flex flex-col w-full gap2">
                      <div className="relative w-full overflow-hidden rounded-full img-container aspect-square">
                        <Profileimage imgsrc={""} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-lg font-medium text-black cursor-pointer dark:text-white">
                      {postDetails?.profileId?.username > 10
                        ? (postDetails?.profileId?.username).slice(0, 10)
                        : postDetails?.profileId?.username}{" "}
                      •{" "}
                      <Moment interval={1} fromNow>
                        {postDetails?.createdAt}
                      </Moment>
                    </h1>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="relative cursor-pointer">
                    <MoreHorizontal
                      onClick={(e) => {
                        e.stopPropagation();
                        setopenPopup(!openPopup);
                      }}
                      color={themeMode === "dark" ? "#fff" : "#000"}
                    />
                    {openPopup && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        style={{ zIndex: 40 }}
                        className="absolute shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] transition-opacity border-slate-700 right-0 w-40  bg-white rounded-md dark:bg-black h-52"
                      ></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-1.5">
                <h1 className="flex-wrap text-black dark:text-white">
                  {postDetails?.caption}
                </h1>
                <div className="flex flex-wrap space-x-2">
                  {postDetails?.hashtags?.map((item, key) => {
                    return (
                      <span
                        key={key}
                        className="text-blue-800 cursor-pointer hover:underline"
                      >
                        #{item}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="max-w-screen-md row-span-2 mx-auto cursor-pointer group">
                  <div className="flex flex-col w-full gap2">
                    <div className="relative w-full overflow-hidden img-container aspect-square ">
                      <img
                        src={postDetails?.imageLink}
                        className="w-full h-full transition img-container selection:bg-none hover:scale-105"
                        alt=""
                        srcSet=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-1.5 py-2 flex items-center space-x-4">
                <h1 className="flex-wrap text-black dark:text-white">
                  {moment(postDetails?.createdAt).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </h1>
                <h1 className="flex-wrap text-black dark:text-white">
                  {postDetails?.comments?.length}
                  <span className="dark:text-gray-400 font-bold">
                    {" "}
                    Comments
                  </span>
                </h1>
                <h1 className="flex-wrap text-black  dark:text-white">
                  {postDetails?.likes?.length}
                  <span className="font-bold text-gray-400"> Likes</span>
                </h1>
              </div>
              <div className="h-[1px] dark:bg-gray-900 bg-slate-300"></div>
              <div className="px-1.5 py-2 flex items-center justify-around">
                <div className="cursor-pointer">
                  <MessageCircle
                    size={29}
                    color={themeMode === "dark" ? "#fff" : "black"}
                  />
                </div>
                <div className="cursor-pointer">
                  {isLiked ? (
                    <AiFillHeart
                      onClick={() => {
                        setisLiked(false);
                      }}
                      size={29}
                      color="#ed1d1d"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={29}
                      onClick={() => {
                        setisLiked(true);
                      }}
                      color={themeMode === "dark" ? "#fff" : "#000"}
                    />
                  )}
                </div>
                <div className="cursor-pointer">
                  <Bookmark
                    size={29}
                    color={themeMode === "dark" ? "#fff" : "black"}
                  />
                </div>
                <div className="cursor-pointer">
                  <ArrowDownToLine
                    size={29}
                    color={themeMode === "dark" ? "#fff" : "black"}
                  />
                </div>
              </div>
              <div className="h-[1px] dark:bg-gray-900 bg-slate-300"></div>
              <div className="mx-4 mt-2">
                <div className="relative py-3 w-full min-w-[200px]">
                  <textarea
                    onChange={(e)=>{setcomment(e.target.value)}}
                    className=" h-full min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent dark:text-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all border dark:border-neutral-600 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Add comment"
                  ></textarea>
                </div>
              </div>
              <div className="">
                {!isUploading ? (
                  <h1
                    onClick={postComment}
                    className="text-center cursor-pointer text-white font-semibold py-2 rounded-lg  max-w-xs w-full bg-blue-600 mx-auto"
                  >
                    Post
                  </h1>
                ) : (
                  <h1 className="text-center cursor-pointer text-white font-semibold py-2 rounded-lg justify-center flex  max-w-xs w-full bg-blue-600 mx-auto">
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
              <div className="h-4"></div>

              <div className="h-[1px] dark:bg-gray-900 bg-slate-300"></div>
            </div>
            <div className="w-full h-40"></div>
          </div>
          <div className="sticky hidden w-1/4 h-[80vh] border border-red-800 top-16 epx:block">
            <h1 className="text-black dark:text-white">Friends</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postdetails;
