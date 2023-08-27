import React, { useContext, useEffect, useState } from "react";
import SideNavbar from "./subcomponents/SideNavbar";
import { Theme } from "./context/ThemeProvider";
import Tweetpostcard from "./subcomponents/Tweets/Tweetcard";
import Tweetskeleton from "./subcomponents/Tweets/Tweetskeleton";

const Tweets = () => {
  const [mounted, setisMounted] = useState(false);
  const { setProgress } = useContext(Theme);
  const [tweets, setTweets] = useState([0, 1, 2, 3]);
  const [fetching, setfetching] = useState(false);

  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    try {
      (async () => {
        setfetching(true);
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/getAllTweets`,
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
        const posts = await postsdata.json();
        if (posts?.success) {
          setfetching(false);
          setTweets(posts?.posts);
        } else {
          setTweets([]);
          setfetching(false);
        }
      })();
    } catch (error) {
      setTweets([]);
      setfetching(false);
    }
    setProgress(100);
  }, [setProgress]);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SideNavbar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4 epx:w-3/4">
            {tweets?.length === 0 && (
              <div className="flex items-center content-center justify-center w-full h-screen">
                <h1 className="inline-block mx-auto text-lg text-black dark:text-white">
                  No saved post found
                </h1>
              </div>
            )}
            {!fetching &&
              tweets?.length !== 0 &&
              tweets?.map((tweet, ind) => {
                return (
                  <Tweetpostcard
                    caption={tweet?.tweet}
                    hashtags={tweet?.hashtags}
                    id={tweet?._id}
                    isLikedpost={tweet?.likes?.includes(
                      tweet?.profileId?.userid
                    )}
                    profileimg={tweet?.profileId?.profileImage}
                    time={tweet?.createdAt}
                    totalLikes={tweet?.likes?.length}
                    username={tweet?.profileId?.username}
                    key={ind}
                  />
                );
              })}
            {fetching && <Tweetskeleton />}
            {fetching && <Tweetskeleton />}
            {fetching && <Tweetskeleton />}
            {fetching && <Tweetskeleton />}
            <div className="h-32"></div>
          </div>
          <div className="sticky hidden w-1/4 h-[80vh] border border-red-800 top-16 epx:block">
            <h1 className="text-black dark:text-white">Friends</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweets;
