import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import SideNavbar from "./subcomponents/SideNavbar";
import Moment from "react-moment";
import Profileimage from "./subcomponents/Profileimage";
import {
  ArrowDownToLine,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { Theme } from "./context/ThemeProvider";
import { useContext } from "react";
import moment from "moment-timezone";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Commentcomp from "./subcomponents/Commentcomp";
import { useSelector } from "react-redux";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import Commentimagecomp from "./subcomponents/CommentImage";

const Postdetails = () => {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [postDetails, setPostdetails] = useState({});
  const [openPopup, setopenPopup] = useState(false);
  const { themeMode } = useContext(Theme);
  const [isLiked, setisLiked] = useState(false);
  const [issaved, setissaved] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [token, settoken] = useState("");
  const [comment, setcomment] = useState("");
  const [fetcherror, setFetcherror] = useState(false);
  const [loading, setloading] = useState(false);
  const [commentloading, setcommentloading] = useState(true);
  const [commentfetcherror, setcommentfetcherror] = useState(false);
  const [allcomment, setallcomment] = useState([]);
  const profile = useSelector((state) => state.setUser);
  const [bookmarkloading, setbookmarkloading] = useState(false);

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
        if (!postsdata.ok) {
        toast.error("Network error accured! refresh page and try again");
        return;
      }
        const posts = await postsdata.json();
        if (posts?.success) {
          setPostdetails(posts?.posts);
          toast.success(posts?.message);
          setFetching(false);
          setissaved(profile?.savedpost?.includes(posts?.posts?._id));
          setisLiked(posts?.posts?.likes?.includes(profile?.userid));
        } else {
          toast.error(posts?.message);
          setFetching(false);
        }
      } catch (error) {
        toast.success("Error");
        setFetching(false);
      }
    })();
  }, [id, profile?.savedpost, profile?.userid]);

  useEffect(() => {
    setMounted(true);
    let tkn = localStorage.getItem("userlogintoken");
    if (tkn) {
      settoken(tkn);
    }
    (async () => {
      setcommentloading(true);
      try {
        const commentdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/fetchCommentonimage`,
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
        if (!commentdata.ok) {
        toast.error("Network error accured! refresh page and try again");
        return;
      }
        const comments = await commentdata.json();
        if (comments?.success) {
          setallcomment(comments?.comments);
          toast.success(comments?.message);
          setcommentloading(false);
          setcommentfetcherror(false);
        } else {
          toast.error(comments?.message);
          setcommentfetcherror(true);
          setcommentloading(false);
        }
      } catch (error) {
        toast.success("Error");
        setcommentloading(false);
        setcommentfetcherror(true);
      }
    })();
  }, [id]);
  if (!mounted) <div className="min-h-screen bg-white dark:bg-black"></div>;

  const likeImage = async () => {
    if (loading) {
      toast.error("Loading...");
      return;
    }
    setisLiked(true);
    setloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/likeimage`,
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
      if (!postsdata.ok) {
        toast.error("Network error accured! refresh page and try again");
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
  const dislikeImage = async () => {
    if (loading) {
      toast.error("Loading...");
      return;
    }
    setisLiked(false);
    setloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/dislikeimage`,
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
      if (!postsdata.ok) {
        toast.error("Network error accured! refresh page and try again");
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
      if (!postsdata.ok) {
        toast.error("Network error accured! refresh page and try again");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setissaved(true);
        setbookmarkloading(false);
      } else {
        toast.error(posts?.message);
        setissaved(false);
        setbookmarkloading(false);
      }
    } catch (error) {
      toast.success("Error");
      setissaved(false);
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
      if (!postsdata.ok) {
        toast.error("Network error accured! refresh page and try again");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setbookmarkloading(false);
        setissaved(false);
      } else {
        toast.error(posts?.message);
        setbookmarkloading(false);
        setissaved(false);
      }
    } catch (error) {
      toast.success("Error");
      setbookmarkloading(false);
      setissaved(false);
    }
  };

  const postComment = async () => {
    setisUploading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/postimagecomment`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: id,
            token: token,
            comment: comment,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata.ok) {
        toast.error("Network error accured! refresh page and try again");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message);
        setcomment("");
        setisUploading(false);
        setFetcherror(false);
      } else {
        toast.error(posts?.message);
        setisUploading(false);
        setFetcherror(true);
      }
    } catch (error) {
      toast.success("Error");
      setisUploading(false);
      setFetcherror(true);
    }
  };
  return (
    <>
      <SideNavbar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          {fetcherror ? (
            <div className="items-center justify-center w-full min-h-screen">
              <h1 className="inline-block mx-auto text-xl font-bold text-black dark:text-white">
                Post not found
              </h1>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full space-y-10 sm:px-4 epx:w-3/4">
              <div className="items-center selection:bg-none justify-center w-full py-3 mx-auto space-y-1 rounded-md shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 sm:mx-0 sm:max-w-xl">
                {fetching ? (
                  <div className="mx-3">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={40}
                    />{" "}
                  </div>
                ) : (
                  <div className="flex px-1.5 items-center justify-between h-12">
                    <Link to={`/profile/${postDetails?.profileId?.username}`}>
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
                    </Link>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="relative cursor-pointer">
                        <MoreHorizontal
                          onClick={(e) => {
                            e.stopPropagation();
                            setopenPopup(!openPopup);
                          }}
                          color={themeMode === "dark" ? "#fff" : "#000"}
                        />
                        {/* {openPopup && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            style={{ zIndex: 40 }}
                            className="absolute shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] transition-opacity border-slate-700 right-0 w-40  bg-white rounded-md dark:bg-black h-52"
                          ></div>
                        )} */}
                      </div>
                    </div>
                  </div>
                )}
                {fetching ? (
                  <div className="mx-3">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={100}
                    />{" "}
                  </div>
                ) : (
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
                )}
                {fetching ? (
                  <div className="mx-2">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={400}
                    />{" "}
                  </div>
                ) : (
                  <div>
                    <div className="max-w-screen-md row-span-2 mx-auto cursor-pointer group">
                      <div className="flex flex-col w-full gap2">
                        <div className="relative w-full overflow-hidden img-container">
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
                )}
                {fetching ? (
                  <div className="mx-2">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={40}
                    />
                  </div>
                ) : (
                  <div className="px-1.5 py-2 flex items-center space-x-4">
                    <h1 className="flex-wrap text-black dark:text-white">
                      {moment(postDetails?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    </h1>
                    <h1 className="flex-wrap text-black dark:text-white">
                      {postDetails?.comments?.length}
                      <span className="font-bold dark:text-gray-400">
                        {" "}
                        Comments
                      </span>
                    </h1>
                    <h1 className="flex-wrap text-black dark:text-white">
                      {postDetails?.likes?.length}
                      <span className="font-bold text-gray-400"> Likes</span>
                    </h1>
                  </div>
                )}
                <div className="h-[1px] dark:bg-gray-900 bg-slate-300"></div>
                {fetching ? (
                  <div className="mx-2">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={50}
                    />
                  </div>
                ) : (
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
                            dislikeImage();
                          }}
                          size={29}
                          color="#ed1d1d"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={29}
                          onClick={() => {
                            likeImage();
                          }}
                          color={themeMode === "dark" ? "#fff" : "#000"}
                        />
                      )}
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
                    ) : !issaved ? (
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
                    <div className="cursor-pointer">
                      <a href={postDetails?.imageLink} download={true}><ArrowDownToLine
                        size={29}
                        color={themeMode === "dark" ? "#fff" : "black"}
                      /></a>
                    </div>
                  </div>
                )}
                <div className="h-[1px] dark:bg-gray-900 bg-slate-300"></div>
                {fetching ? (
                  <div className="mx-2">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={150}
                    />
                  </div>
                ) : (
                  <div className="mx-4 mt-2">
                    <div className="relative py-3 w-full min-w-[200px]">
                      <textarea
                        onChange={(e) => {
                          setcomment(e.target.value);
                        }}
                        className=" h-full min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent dark:text-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all border dark:border-neutral-600 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="Add comment"
                      ></textarea>
                    </div>
                  </div>
                )}
                {fetching ? (
                  <div className="mx-2">
                    <Skeleton
                      baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
                      height={50}
                    />
                  </div>
                ) : (
                  <div className="">
                    {!isUploading ? (
                      <h1
                        onClick={postComment}
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
                )}
                <div className="h-4"></div>

                <div className="h-[1px] dark:bg-gray-900 bg-slate-300"></div>
                <div className="mx-3">
                  <h1 className="text-lg font-semibold text-black dark:text-white">
                    Comments
                    {`(${!fetching ? postDetails?.comments?.length : 0})`}
                  </h1>
                </div>
                <div className="mx-2">
                  {allcomment?.map((onecomment, key) => {
                    return (
                      <Commentimagecomp
                        key={key}
                        comment={onecomment?.comment}
                        username={onecomment?.profileId?.username}
                        profileImage={onecomment?.profileId?.profileImage}
                        createdAt={onecomment?.createdAt}
                        id={onecomment?._id}
                        tweetid={id}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-full h-40"></div>
            </div>
          )}
          <div className="sticky hidden w-1/4 h-[80vh] border border-red-800 top-16 epx:block">
            <h1 className="text-black dark:text-white">Friends</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postdetails;
