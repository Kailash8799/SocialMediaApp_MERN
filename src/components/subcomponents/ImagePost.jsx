import React, { useContext, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { MoreHorizontal, X } from "lucide-react";
import { Theme } from "../context/ThemeProvider";

const ImagePost = ({ src, username, time, caption, hashtags }) => {
  const [imageloaded, setImageloaded] = useState(false);
  const { themeMode } = useContext(Theme);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageloaded(true);
    };
    img.src = src;
  }, [src]);
  return (
    <div className="items-center justify-center w-full py-3 mx-auto space-y-1 rounded-md shadow-md shadow-slate-500 dark:shadow-slate-600 sm:mx-0 sm:max-w-xl">
      <div className="flex px-1.5 items-center justify-between h-12">
        {/*  For the header of posts */}
        <div className="flex items-center justify-center space-x-3">
          <div class="cursor-pointer">
            <div class="gap2 flex w-full flex-col">
              <div class="relative aspect-square w-full overflow-hidden rounded-full">
                <img
                  className="transition rounded-full w-11 h-11 hover:scale-105"
                  src={src}
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-medium text-black cursor-pointer dark:text-white">
              {username} • {time}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <div className="cursor-pointer">
            <MoreHorizontal color={themeMode === "dark" ? "#fff" : "#000"} />
          </div>
          <div className="cursor-pointer">
            <X color={themeMode === "dark" ? "#fff" : "#000"} />
          </div>
        </div>
      </div>
      <div className="px-1.5">
        <h1 className="flex-wrap text-black dark:text-white">{caption} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, aliquid. Eos voluptate placeat delectus incidunt esse itaque iusto rerum! Numquam itaque maiores autem fugiat rerum officia architecto odio cum laboriosam sapiente voluptas amet obcaecati, iure possimus, et quod delectus voluptatibus iusto, quis id! Neque saepe magni, tempora delectus ex harum.</h1>
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
            height={300}
            resolutionX={32}
            resolutionY={32}
            punch={0}
          />
        )}
        {imageloaded && (
          <div class="group row-span-2 mx-auto max-w-screen-md cursor-pointer">
            <div class="gap2 flex w-full flex-col">
              <div class="relative aspect-square w-full overflow-hidden ">
                <img
                  src="https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
                  class="h-full w-full transition hover:scale-105"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>
        )}
        {/*  For the posts */}
        {/* <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width={"100%"}
          height={300}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        /> */}
      </div>
      <div className="flex items-center justify-between h-12">
        {/*  For the footer of posts */}
      </div>
    </div>
  );
};

export default ImagePost;
