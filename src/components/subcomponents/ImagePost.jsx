import React, { useContext, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import {
  Bookmark,
  MessagesSquare,
  MoreHorizontal,
  Send,
  X,
} from "lucide-react";
import { Theme } from "../context/ThemeProvider";
import { PuffLoader } from "react-spinners";
import Profileimage from "./Profileimage";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Moment from "react-moment";
import "moment-timezone";

const ImagePost = ({
  profileimg,
  src,
  username,
  time,
  caption,
  hashtags,
  totalLikes,
}) => {
  const [imageloaded, setImageloaded] = useState(false);
  // const [profileimageloaded, setprofileimageloaded] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const [addComment, setAddComment] = useState("");
  const [commentAdding, setCommentAdding] = useState(false);
  const [openPopup, setopenPopup] = useState(false);

  const { themeMode } = useContext(Theme);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageloaded(true);
    };

    img.src = src;
  }, [src]);
  return (
    <>
      <div
        onClick={(e) => {
          setopenPopup(false);
        }}
        className="items-center selection:bg-none justify-center w-full py-3 mx-auto space-y-1 rounded-md shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 sm:mx-0 sm:max-w-xl"
      >
        <div className="flex px-1.5 items-center justify-between h-12">
          {/*  For the header of posts */}
          <div className="flex items-center justify-center space-x-3">
            <div className="cursor-pointer">
              <div className="flex flex-col w-full gap2">
                <div className="relative w-full overflow-hidden rounded-full img-container aspect-square">
                  <Profileimage key={profileimg} imgsrc={profileimg} />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-medium text-black cursor-pointer dark:text-white">
                {username?.length > 10 ? username.slice(0, 10) : username} •{" "}
                <Moment interval={1} fromNow>{time}</Moment>
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
            <div className="cursor-pointer">
              <X color={themeMode === "dark" ? "#fff" : "#000"} />
            </div>
          </div>
        </div>
        <div className="px-1.5">
          <h1 className="flex-wrap text-black dark:text-white">{caption}</h1>
          <div className="flex flex-wrap space-x-2">
            {hashtags?.map((item, key) => {
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
          {!imageloaded && (
            <Blurhash
              hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
              width={"100%"}
              height={350}
              resolutionX={32}
              resolutionY={32}
              punch={0}
            />
          )}
          {imageloaded && (
            <div className="max-w-screen-md row-span-2 mx-auto cursor-pointer group">
              <div className="flex flex-col w-full gap2">
                <div className="relative w-full overflow-hidden img-container aspect-square ">
                  <img
                    src={src}
                    className="w-full h-full transition img-container selection:bg-none hover:scale-105"
                    alt=""
                    srcSet=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between h-12 px-3">
          {/*  For the footer of posts */}
          <div className="flex items-center justify-center space-x-5">
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
              <MessagesSquare
                size={27}
                color={themeMode === "dark" ? "#fff" : "#000"}
              />
            </div>
            <div className="cursor-pointer">
              <Send size={25} color={themeMode === "dark" ? "#fff" : "#000"} />
            </div>
          </div>
          <div className="cursor-pointer">
            <Bookmark
              size={28}
              color={themeMode === "dark" ? "#fff" : "#000"}
            />
          </div>
        </div>
        <div className="px-3">
          {isLiked ? (
            <h1 className="-mt-2 font-semibold text-black dark:text-white">
              Liked by you {totalLikes !== 0 && `and ${totalLikes} others`}
            </h1>
          ) : (
            <h1 className="-mt-2 font-semibold text-black dark:text-white">
              {totalLikes} likes
            </h1>
          )}
        </div>
        <div className="flex items-center justify-between mx-3 space-x-4">
          <div className="w-11/12">
            <input
              type="text"
              value={addComment}
              onChange={(e) => {
                setAddComment(e.target.value);
              }}
              className="w-full px-2 py-1 text-black bg-white rounded-md shadow-sm focus:border-0 focus:outline-none dark:text-white shadow-slate-500 dark:bg-black"
              placeholder="add comment"
            />
          </div>
          <div className="items-center justify-center w-1/12">
            {commentAdding ? (
              <PuffLoader color="blue" size={30} />
            ) : (
              <h1
                onClick={() => {
                  setCommentAdding(true);
                  setTimeout(() => {
                    setCommentAdding(false);
                  }, 1000);
                }}
                className="text-lg text-center text-blue-900 cursor-pointer"
              >
                post
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePost;
