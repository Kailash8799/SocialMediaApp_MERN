import { useContext, useEffect, useState } from "react";
import VideoSidebar from "./subcomponents/Videoscomp/VideoSidebar";
import OneVideo from "./subcomponents/Videoscomp/OneVideo";
import { Theme } from "./context/ThemeProvider";

const Watch = () => {
  const [mounted,setisMounted] = useState(false)
  const {setProgress} = useContext(Theme)
  useEffect(()=>{
    setProgress(0)
    setisMounted(true)
    setProgress(100)
  },[setProgress])
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <VideoSidebar />
      <div className="relative min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div className="px-2 pt-5 xs:px-4 sm:flex sm:flex-row sm:px-0">
          <div className="flex flex-col items-center w-full space-y-10 sm:px-4">
            <OneVideo
              src={
                "https://images.unsplash.com/photo-1521133573892-e44906baee46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              }
              username={"kailash8799"}
              time={"3h"}
              caption={"Hey buddy hello"}
              hashtags={["hello","hey"]}
              totalLikes={300}
            />
            <div className="w-full h-40"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
