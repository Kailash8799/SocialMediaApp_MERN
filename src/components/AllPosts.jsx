import React, { useContext, useEffect, useState } from "react";
import { Theme } from "./context/ThemeProvider";
import ImagePost from "./subcomponents/ImagePost";
import SideNavbar from "./subcomponents/SideNavbar";
import PostSkeleton from "./subcomponents/PostSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/postaction";

const AllPosts = () => {
  const { setProgress } = useContext(Theme);
  const [mounted, setisMounted] = useState(false);
  const [fetching, setfetching] = useState(false);
  const profile = useSelector((state)=>state.setUser)
  const dispatch = useDispatch();
  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    setProgress(100);
  }, [setProgress]);
  const [posts, setposts] = useState([]);
  
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
                token:localStorage.getItem("userlogintoken")
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const posts = await postsdata.json();
          if (posts?.success) {
            setfetching(false);
            dispatch(setUser(posts?.profile));
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
  
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <SideNavbar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4 epx:w-3/4">
            {posts.map((item, ind) => {
              return (
                <ImagePost
                  key={ind}
                  src={item?.imageLink}
                  id={item?._id}
                  profileimg={item?.profileId?.profileImage}
                  username={item?.profileId?.username}
                  time={item?.createdAt}
                  caption={item?.caption}
                  hashtags={item?.hashtags}
                  totalLikes={item?.likes?.length}
                  totalComments={item?.comments?.length}
                  tagged={item?.tagged}
                  
                  isLikedpost={item?.likes?.includes(profile?.userid)}
                  isSavedPost={profile?.savedpost?.includes(item?._id)}
                />
              );
            })}
            {fetching && <PostSkeleton />}
            {fetching && <PostSkeleton />}
            <div className="w-full h-40"></div>
          </div>
          <div className="sticky hidden w-1/4 h-[80vh]  border-red-800 top-16 epx:block">
            {/* <h1 className="text-black dark:text-white">Friends</h1> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPosts;
