import React from "react";
import OneStory from "./OneStory";
import {AiFillPlusCircle} from 'react-icons/ai'

const Stories = () => {
  return (
    <div className="items-center selection:bg-none w-full h-56 mx-auto sm:mx-0 sm:max-w-xl shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 overflow-y-auto flex rounded-lg no-scrollbar justify-between flex-shrink-0">
      <div className="h-48 mx-2 rounded-lg shadow-inner border-b-[1px] border-slate-300 dark:border-slate-800 storywidth cursor-pointer shadow-slate-400 dark:shadow-slate-600 flex-shrink-0 relative">
      <div style={{ zIndex: 50 }} className="absolute dark:bg-black bg-white p-1 rounded-full top-[102px] left-[30px]">
          <div className="cursor-pointer">
            <div className="flex flex-col w-full gap2">
              <div className="relative w-full overflow-hidden rounded-full aspect-square">
                <AiFillPlusCircle size={46} color="blue"/>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32">
          <div className="relative img-container w-full h-full overflow-hidden rounded-t-lg aspect-auto">
            <img
              src="https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
              className="w-full img-container h-full transition hover:scale-105"
              alt=""
              loading="lazy"
              style={{ width: "100%" }}
              srcSet=""
            />
          </div>
        </div>
        <div style={{ zIndex: 50 }} className="absolute items-center justify-center bottom-1 mx-0.5 w-full">
          <h1 className="text-center text-black dark:text-white">Create Story</h1>
        </div>
      </div>
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
      <OneStory />
      <OneStory />
    </div>
  );
};

export default Stories;
