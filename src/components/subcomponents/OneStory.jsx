import React from "react";

const OneStory = () => {
  return (
    <div className="h-48 mx-2 rounded-lg shadow-inner border-b-[1px] border-slate-300 dark:border-slate-800 storywidth cursor-pointer shadow-slate-400 dark:shadow-slate-600 flex-shrink-0 relative">
      <div style={{ zIndex: 50 }} className="absolute top-1 left-1">
        <div className="cursor-pointer">
          <div className="flex flex-col w-full gap2">
            <div className="relative w-full overflow-hidden rounded-full aspect-square">
              <img
                className="transition border-[3px] border-blue-600 rounded-full w-11 h-11 hover:scale-105"
                src={
                  "https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
                }
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-full">
            <div className="relative w-full h-full overflow-hidden rounded-lg aspect-auto">
              <img
                src="https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
                className="w-full h-full transition hover:scale-105"
                alt=""
                loading="lazy"
                style={{width:"100%"}}
                srcSet=""
              />
        </div>
      </div>
      <div style={{ zIndex: 50 }} className="absolute bottom-1 mx-0.5">
        <h1 className="text-white">Kailash Rajput</h1>
      </div>
    </div>
  );
};

export default OneStory;
