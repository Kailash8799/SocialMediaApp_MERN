import moment from "moment-timezone";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import toast from "react-hot-toast";

const Commentimagecomp = ({ username, profileImage, createdAt, comment, id,tweetid }) => {
  const [openPopup, setopenPopup] = useState(false);

  const deleteComment = async () => {
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/deleteimagecomment`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            postid: tweetid,
            token: localStorage.getItem("userlogintoken"),
            commentid: id,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if(!postsdata?.ok){
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
  }
  return (
    <div
      onClick={() => {
        setopenPopup(false);
      }}
    >
      <article className="p-6 mb-6 text-base rounded-lg bg-neutral-500/20 dark:bg-gray-900">
        <footer className="flex items-center justify-between w-full mb-2">
          <Link to={`/profile/${username}`}>
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="w-6 h-6 mr-2 rounded-full"
                  src={profileImage || "/user.png"}
                  alt="Michael Gough"
                />
                {username}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time>{moment(createdAt).format("MMMM Do YYYY, h:mm a")}</time>
              </p>
            </div>
          </Link>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setopenPopup(!openPopup);
            }}
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="relative cursor-pointer"
            type="button"
          >
            <BsThreeDots />
            {openPopup && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{ zIndex: 40 }}
                className="absolute shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] transition-opacity border-slate-700 right-0 w-40  bg-white rounded-md dark:bg-black top-4 h-20"
              >
                <h1 onClick={deleteComment} className="px-2 py-2 mt-2 text-black rounded-lg dark:text-white bg-slate-400">
                  Delete
                </h1>
              </div>
            )}
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment}</p>
        {/* <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
        </div> */}
      </article>
    </div>
  );
};

export default Commentimagecomp;
