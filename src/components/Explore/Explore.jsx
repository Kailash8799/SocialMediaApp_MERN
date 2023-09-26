import React, { useContext, useEffect, useState } from "react";
import SideNavbar from "../subcomponents/SideNavbar";
import ExplorePost from "./ExplorePost";
import { Theme } from "../context/ThemeProvider";
import toast from "react-hot-toast";

const Explore = () => {
  const exploreimages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [posts, setposts] = useState([]);
  const { setProgress } = useContext(Theme);
  const [mounted, setisMounted] = useState(false);
  const [fetching, setfetching] = useState(false);
  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    try {
      (async () => {
        setfetching(true);
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/getAllPosts`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
              token: localStorage.getItem("userlogintoken"),
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
          setfetching(false);
          setposts(posts?.posts);
        } else {
          setposts([]);
          setfetching(false);
        }
      })();
    } catch (error) {
      setposts([]);
      setfetching(false);
    }
    setProgress(100);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-none dark:bg-black">
      <SideNavbar />
      <div className="md:px-20 sm:py-3 sm:px-5 lg:ml-64 sm:ml-16">
        <div className="w-full px-1 py-2 bg-white dark:bg-black sm:hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-1.5  px-2 dark:text-white focus:outline-none text-black text-lg rounded-lg bg-neutral-500/30 dark:bg-neutral-600/50"
          />
        </div>
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {posts?.map((image, ind) => {
            return <ExplorePost key={ind} img={image?.imageLink} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
