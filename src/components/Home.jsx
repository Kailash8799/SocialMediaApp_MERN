import { useContext, useEffect, useState } from "react";
import ImagePost from "./subcomponents/ImagePost";
import SideNavbar from "./subcomponents/SideNavbar";
import Stories from "./subcomponents/Stories";
import { Theme } from "./context/ThemeProvider";

const Home = () => {
  const { setProgress } = useContext(Theme);
  const [mounted, setisMounted] = useState(false);
  try {
    useEffect(() => {
      setProgress(0);
      setisMounted(true);
      try {
        (async () => {
          const postsdata = await fetch(
            `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/getAllPosts`,
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
            sethomefeed(posts?.posts);
          } else {
            sethomefeed([]);
          }
        })();
      } catch (error) {
        sethomefeed([]);
      }
      setProgress(100);
    }, [setProgress]);
  } catch (error) {}
  const [homefeed, sethomefeed] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  console.log(homefeed);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <SideNavbar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4 epx:w-3/4">
            <Stories />
            {homefeed?.map((item, ind) => {
              return (
                <ImagePost
                  key={ind}
                  src={item?.imageLink}
                  profileimg={item?.profileId?.profileImage}
                  username={item?.profileId?.username}
                  time={item?.createdAt}
                  caption={item?.caption}
                  hashtags={item?.hashtags}
                  totalLikes={(item?.likes)?.length}
                  totalComments={(item?.comments)?.length}
                  tagged={item?.tagged}
                />
              );
            })}
            <div className="w-full h-40"></div>
          </div>
          <div className="sticky hidden w-1/4 h-[80vh] border border-red-800 top-16 epx:block">
            <h1 className="text-black dark:text-white">Friends</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
