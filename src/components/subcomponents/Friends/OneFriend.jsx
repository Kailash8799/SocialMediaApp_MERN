import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const OneFriend = ({ id, username, image, token, isFollowed }) => {
  
  const [mounted, setisMounted] = useState(false);
  const [loading, setloading] = useState(false);
  const [followloading, setfollowloading] = useState(false);
  const [isFolloweduser,setisFolloweduser] = useState(isFollowed);
  
  useEffect(() => {
    setloading(false);
    setisMounted(true);
  }, []);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;

  const followUser = async () => {
    setfollowloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/followuser`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            userid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if(!postsdata?.ok){
        toast.error("Network error accured!");
        setfollowloading(false);
        setisFolloweduser(false)
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message+ " " + username);
        setfollowloading(false);
        setisFolloweduser(true)
      } else {
        toast.error(posts?.message);
        setfollowloading(false);
      }
    } catch (error) {
      toast.error("Error");
      setfollowloading(false);
    }
  };
  const unfollowUser = async () => {
    setfollowloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/unfollowuser`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            userid: id,
            token: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if(!postsdata?.ok){
        toast.error("Network error accured!");
        setfollowloading(false);
        setisFolloweduser(true)
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        toast.success(posts?.message + " " + username);
        setfollowloading(false);
        setisFolloweduser(false)
      } else {
        toast.error(posts?.message);
        setfollowloading(false);
      }
    } catch (error) {
      toast.error("Error");
      setfollowloading(false);
    }
  };

  return (
    <div className="cursor-pointer selection:bg-none my-2 rounded-lg shadow-inner dark:border-b-[1px] border-slate-700 shadow-slate-500 dark:shadow-slate-500">
      <div className="relative w-full overflow-hidden rounded-t-lg img-container aspect-square">
        <img
          src={image}
          className="w-full h-full transition img-container hover:scale-105"
          alt=""
          srcSet=""
        />
      </div>
      <div className="mx-1.5">
        <div className="mx-2">
          <h1 className="my-1 text-lg font-bold text-black dark:text-white">
            {username.length > 13 ? username.slice(0, 13) + "..." : username}
          </h1>
        </div>
        <div className="items-center justify-center my-2 space-y-3">
          {!followloading ? (
            !isFolloweduser ? <h1
              onClick={followUser}
              className="font-bold text-center mx-2 py-1.5 rounded-lg text-black bg-slate-300/50 dark:bg-gray-700/80 dark:text-white"
            >
              Follow
            </h1> : <h1
              onClick={unfollowUser}
              className="font-bold text-center mx-2 py-1.5 rounded-lg text-black bg-slate-300/50 dark:bg-gray-700/80 dark:text-white"
            >
              UnFollow
            </h1> 
          ) : (
            <h1
              onClick={followUser}
              className="font-bold text-center mx-2 py-1.5 rounded-lg text-black bg-slate-300/50 dark:bg-gray-700/80 dark:text-white"
            >
              <ColorRing
                visible={true}
                height="25"
                width="25"
                ariaLabel="blocks-loading"
                wrapperStyle={{ margin: "auto" }}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </h1>
          )}
          <h1 className="font-bold text-center mx-2 py-1.5 rounded-lg text-black bg-slate-300/50 dark:bg-gray-700/80 dark:text-white">
            Remove
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OneFriend;
