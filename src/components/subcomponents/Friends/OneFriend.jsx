import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

const OneFriend = ({ id }) => {
  const [mounted, setisMounted] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(false)
    setisMounted(true);
  }, []);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <div className="cursor-pointer selection:bg-none my-2 rounded-lg shadow-inner dark:border-b-[1px] border-slate-700 shadow-slate-500 dark:shadow-slate-500">
      <div className="relative img-container w-full overflow-hidden rounded-t-lg aspect-square">
        <img
          src="https://res.cloudinary.com/dyyonlqge/image/upload/v1685327821/bxgrtnyp2rt4uynge9nx.webp"
          className="w-full h-full img-container transition hover:scale-105"
          alt=""
          srcSet=""
        />
      </div>
      <div className="mx-1.5">
        <div className="mx-2">
          <h1 className="my-1 text-lg font-bold text-black dark:text-white">
            Kailash Rajput
          </h1>
        </div>
        <div className="items-center justify-center my-2 space-y-3">
          <h1 className="font-bold text-center mx-2 py-1.5 rounded-lg text-black bg-slate-300/50 dark:bg-gray-700/80 dark:text-white">
            {!loading ? (
              "Follow"
            ) : (
              <ColorRing
                visible={true}
                height="25"
                width="25"
                ariaLabel="blocks-loading"
                wrapperStyle={{ margin: "auto" }}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </h1>
          <h1 className="font-bold text-center mx-2 py-1.5 rounded-lg text-black bg-slate-300/50 dark:bg-gray-700/80 dark:text-white">
            Remove
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OneFriend;
