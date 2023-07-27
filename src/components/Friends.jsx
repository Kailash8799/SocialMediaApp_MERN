import React, { useContext, useEffect, useState } from "react";
import AllFriend from "./subcomponents/Friends/AllFriend";
import SideNavbarFriend from "./subcomponents/Friends/Sidebar";
import { Theme } from "./context/ThemeProvider";

const Friends = () => {
  const [mounted, setisMounted] = useState(false);
  const {setProgress} = useContext(Theme)
  useEffect(() => {
    setProgress(0)
    setisMounted(true);
    setProgress(100)
  }, [setProgress]);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <SideNavbarFriend />
      <div className="min-h-screen bg-white epx:ml-64 dark:bg-black">
        <AllFriend />
      </div>
    </>
  );
};

export default Friends;
