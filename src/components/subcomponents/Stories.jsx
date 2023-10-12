import React, { useContext, useEffect, useState } from "react";
import OneStory from "./OneStory";
import { AiFillPlusCircle } from "react-icons/ai";
import { Theme } from "../context/ThemeProvider";
import toast from "react-hot-toast";

const Stories = () => {
  const [stories, setstories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/story/getallstory`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
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
          setstories(posts?.story);
        } else {
          toast.error(posts?.message);
          setstories([]);
        }
      } catch (error) {
        setstories([]);
        toast.success("Error");
      }
    })();
  }, []);
  const { setstoryModal, setstoryModalanimation } = useContext(Theme);
  return (
    <div className="items-center selection:bg-none w-full h-56 mx-auto sm:mx-0 sm:max-w-xl shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 overflow-y-auto flex rounded-lg no-scrollbar justify-start flex-shrink-0">
      <div
        onClick={() => {
          setstoryModal(true);
          setstoryModalanimation(true);
        }}
        className="h-48 mx-2 rounded-lg shadow-inner border-b-[1px] border-slate-300 dark:border-slate-800 storywidth cursor-pointer shadow-slate-400 dark:shadow-slate-600 flex-shrink-0 relative"
      >
        <div
          style={{ zIndex: 50 }}
          className="absolute dark:bg-black bg-white p-1 rounded-full top-[102px] left-[30px]"
        >
          <div className="cursor-pointer">
            <div className="flex flex-col w-full gap2">
              <div className="relative w-full overflow-hidden rounded-full aspect-square">
                <AiFillPlusCircle size={46} color="blue" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-32">
          <div className="relative w-full h-full overflow-hidden rounded-t-lg img-container aspect-auto">
            <img
              src="https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
              className="w-full h-full transition img-container hover:scale-105"
              alt=""
              loading="lazy"
              style={{ width: "100%" }}
              srcSet=""
            />
          </div>
        </div>
        <div
          style={{ zIndex: 50 }}
          className="absolute items-center justify-center bottom-1 mx-0.5 w-full"
        >
          <h1 className="text-center text-black dark:text-white">
            Create Story
          </h1>
        </div>
      </div>
      {stories?.map((item, ind) => {
        console.log(item);
        return (
          <OneStory
            id={item?._id}
            src={item?.imageLink}
            userId={item?.userid?._id}
            key={ind}
            userProfileimg={item?.userid?.profileImage}
            username={item?.userid?.username}
          />
        );
      })}
      {/* <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory />
      <OneStory /> */}
    </div>
  );
};

export default Stories;
