import { useContext, useEffect, useState } from "react";
import VideoSidebar from "./subcomponents/Videoscomp/VideoSidebar";
import OneVideo from "./subcomponents/Videoscomp/OneVideo";
import { Theme } from "./context/ThemeProvider";
import toast from "react-hot-toast";
import PostSkeleton from "./subcomponents/PostSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/postaction";

const Watch = () => {
  const [mounted, setisMounted] = useState(false);
  const { setProgress } = useContext(Theme);
  const [fetching, setfetching] = useState(false);
  const [videos, setvideos] = useState([]);
  const profile = useSelector((state) => state.setUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    try {
      (async () => {
        setfetching(true);
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/getAllVideos`,
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
        if (!postsdata.ok) {
          toast.error("Network error accured, Refresh page and try again!");
          return;
        }
        const posts = await postsdata.json();
        console.log(posts);
        if (posts?.success) {
          setfetching(false);
          dispatch(setUser(posts?.profile));
          setvideos(posts?.videos);
        } else {
          setvideos([]);
          setfetching(false);
        }
      })();
    } catch (error) {
      setvideos([]);
      setfetching(false);
    }
    setProgress(100);
  }, [dispatch, setProgress]);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <VideoSidebar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4">
            {!fetching &&
              videos?.map((item) => {
                return (
                  <OneVideo
                    key={item?._id}
                    id={item?._id}
                    isLikedpost={item?.likes?.includes(profile?.userid)}
                    isSavedPost={profile?.savedpost?.includes(item?._id)}
                    src={item?.profileId?.profileImage}
                    videoLink={item?.videoLink}
                    username={item?.profileId?.username}
                    time={item?.createdAt}
                    caption={item?.caption}
                    hashtags={item?.hashtags}
                    totalLikes={item?.likes?.length}
                    profile={profile}
                    ownerid={item?.profileId?._id}
                  />
                );
              })}
            {fetching && <PostSkeleton />}
            {fetching && <PostSkeleton />}
            <div className="w-full h-40"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
