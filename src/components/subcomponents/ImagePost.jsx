import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

const ImagePost = ({ src,username }) => {
  const [imageloaded, setImageloaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageloaded(true);
    };
    img.src = src;
  }, [src]);
  return (
    <div className="items-center justify-center w-full mx-auto border border-red-500 sm:mx-0 sm:max-w-xl">
      <div className="flex items-center justify-between h-12">
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
            <h1 className="text-lg font-medium text-black dark:text-white">{username}</h1>
          </div>
        </div>
        <div>
          <h1 className="text-red-50">Hello</h1>
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
