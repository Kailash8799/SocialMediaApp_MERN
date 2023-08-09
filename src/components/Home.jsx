import { useContext, useEffect, useState } from "react";
import ImagePost from "./subcomponents/ImagePost";
import SideNavbar from "./subcomponents/SideNavbar";
import Stories from "./subcomponents/Stories";
import { Theme } from "./context/ThemeProvider";

const Home = () => {
  const {setProgress} = useContext(Theme)
  const [mounted,setisMounted] = useState(false)
  useEffect(()=>{
    setProgress(0)
    setisMounted(true)
    setProgress(100)
  },[setProgress])
  const [homefeed,sethomefeed] = useState([0,1,2,3,4,5,6,7])
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <SideNavbar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4 epx:w-3/4">
            <Stories />
            {homefeed.map((item,ind)=>{
              return <ImagePost
              key={ind}
              src={
                "https://images.unsplash.com/photo-1521133573892-e44906baee46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              }
              profileimg={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSP_JBfBf2vOoWdnDuL-IhDH1JwxIsWGutw6N7dePBzFD7bMI8HMncpECiEX1tdfHaT7M&usqp=CAU"}
              username={"kailash8799"}
              time={"3h"}
              caption={"Hey buddy hello"}
              hashtags={["hello","hey"]}
              totalLikes={300}
            />
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
