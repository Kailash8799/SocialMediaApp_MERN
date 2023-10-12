import React, { useContext, useEffect, useState } from "react";
import { MessagesSquare, MoreHorizontal, Send, X } from "lucide-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PuffLoader } from "react-spinners";
import { Theme } from "../../context/ThemeProvider";
import Profileimage from "../Profileimage";
import toast from "react-hot-toast";
import Moment from "react-moment";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

const OneVideo = ({
  id,
  src,
  username,
  time,
  caption,
  hashtags,
  totalLikes,
  videoLink,
  isSavedPost,
  isLikedpost,
  profile,
  ownerid,
}) => {
  const [isLiked, setisLiked] = useState(isLikedpost);
  const [addComment, setAddComment] = useState("");
  const [commentAdding, setCommentAdding] = useState(false);
  const [isSaved, setisSaved] = useState(isSavedPost);
  const [openPopup, setopenPopup] = useState(false);
  const [token, settoken] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setloading] = useState(false);
  const [bookmarkloading, setbookmarkloading] = useState(false);

  const { themeMode } = useContext(Theme);

  useEffect(() => {
    setMounted(true);
    let tkn = localStorage.getItem("userlogintoken");
    if (tkn) {
      settoken(tkn);
    }
  }, []);
  if (!mounted) return;

  const likeVideo = async () => {
    if (loading) {
      toast.error("Loading...");
      return;
    }
    setisLiked(true);
    setloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/likevideo`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      console.log(posts);
      if (posts?.success) {
        toast.success(posts?.message);
        setloading(false);
      } else {
        toast.error(posts?.message);
        setloading(false);
      }
    } catch (error) {
      toast.success("Error");
      setloading(false);
    }
  };
  const dislikeVideo = async () => {
    if (loading) {
      toast.error("Loading...");
      return;
    }
    setisLiked(false);
    setloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/dislikevideo`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setloading(false);
      } else {
        toast.error(posts?.message);
        setloading(false);
      }
    } catch (error) {
      toast.success("Error");
      setloading(false);
    }
  };

  const savePost = async () => {
    if (bookmarkloading) {
      toast.error("Loading...");
      return;
    }
    setbookmarkloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/saved`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setisSaved(true);
        setbookmarkloading(false);
      } else {
        toast.error(posts?.message);
        setisSaved(false);
        setbookmarkloading(false);
      }
    } catch (error) {
      toast.success("Error");
      setisSaved(false);
      setbookmarkloading(false);
    }
  };

  const unsavePost = async () => {
    if (bookmarkloading) {
      toast.error("Loading...");
      return;
    }
    setbookmarkloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/unsaved`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setbookmarkloading(false);
        setisSaved(false);
      } else {
        toast.error(posts?.message);
        setbookmarkloading(false);
        setisSaved(false);
      }
    } catch (error) {
      toast.success("Error");
      setbookmarkloading(false);
      setisSaved(false);
    }
  };

  const postComment = async () => {
    setCommentAdding(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/postvideocomment`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
            comment: addComment,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setAddComment("");
        setCommentAdding(false);
      } else {
        toast.error(posts?.message);
        setCommentAdding(false);
      }
    } catch (error) {
      toast.success("Error");
      setCommentAdding(false);
    }
  };

  const deleteVideo = async () => {
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/deletevideo`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            videoid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        window.location.reload();
      } else {
        toast.error(posts?.message);
      }
    } catch (error) {
      toast.success("Error");
    }
  };

  return (
    <div className="items-center selection:bg-none justify-center w-full py-3 mx-auto space-y-1 rounded-md shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 sm:mx-0 sm:max-w-xl">
      <div className="flex px-1.5 items-center justify-between h-12">
        {/*  For the header of posts */}
        <div className="flex items-center justify-center space-x-3">
          <div className="cursor-pointer">
            <div className="flex flex-col w-full gap2">
              <div className="relative w-full overflow-hidden rounded-full img-container aspect-square">
                <Profileimage imgsrc={src} />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-medium text-black cursor-pointer dark:text-white">
              {username?.length > 10 ? username.slice(0, 10) : username} •{" "}
              <Moment interval={1} fromNow>
                {time}
              </Moment>
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3">
         {profile?._id === ownerid && <div className="mr-2 relative cursor-pointer">
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
                className="absolute shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] transition-opacity border-slate-700 right-0 w-40  bg-white rounded-md dark:bg-black h-12"
              >
                {profile?._id === ownerid && (
                  <h1
                    onClick={deleteVideo}
                    className="p-2 text-black bg-slate-700/30 m-1 rounded-md dark:text-white"
                  >
                    Delete Post
                  </h1>
                )}
              </div>
            )}
          </div>}
          {/* <div className="cursor-pointer">
            <X color={themeMode === "dark" ? "#fff" : "#000"} />
          </div> */}
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
        <Link to={`/videos/${id}`}>
          <div className="max-w-screen-md row-span-2 mx-auto cursor-pointer group">
            <div className="flex flex-col w-full gap2">
              <div className="relative w-full overflow-hidden aspect-square ">
                <video
                  src={videoLink}
                  className="w-full h-full transition img-container"
                  controls
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between h-12 px-3">
        {/*  For the footer of posts */}
        <div className="flex items-center justify-center space-x-5">
          <div className="cursor-pointer">
            {isLiked ? (
              <AiFillHeart
                onClick={() => {
                  dislikeVideo();
                  setisLiked(false);
                }}
                className="transition-all transform"
                size={29}
                color="#ed1d1d"
              />
            ) : (
              <AiOutlineHeart
                size={29}
                onClick={() => {
                  setisLiked(true);
                  likeVideo();
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
        {bookmarkloading ? (
          <div className="cursor-pointer">
            <RotatingLines
              strokeColor={themeMode === "dark" ? "#fff" : "black"}
              strokeWidth="5"
              animationDuration="0.75"
              width="23"
              visible={true}
            />
          </div>
        ) : !isSaved ? (
          <div onClick={savePost} className="cursor-pointer">
            <BsBookmark
              size={24}
              color={themeMode === "dark" ? "#fff" : "#000"}
            />
          </div>
        ) : (
          <div onClick={unsavePost} className="cursor-pointer">
            <BsFillBookmarkFill
              size={24}
              color={themeMode === "dark" ? "#fff" : "#000"}
            />
          </div>
        )}
      </div>
      <div className="px-3">
        {isLiked ? (
          <h1 className="-mt-2 font-semibold text-black dark:text-white">
            Liked by you and {totalLikes} others
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
                postComment();
              }}
              className="text-lg text-center text-blue-900 cursor-pointer"
            >
              post
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneVideo;
