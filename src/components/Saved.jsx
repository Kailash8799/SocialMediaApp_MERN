import React, { useContext, useEffect, useState } from "react";
import SideNavbar from "./subcomponents/SideNavbar";
import { Theme } from "./context/ThemeProvider";

const Saved = () => {
  const [mounted, setisMounted] = useState(false);
  const { setProgress } = useContext(Theme);

  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    setProgress(100);
  }, [setProgress]);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SideNavbar />
      <div className="lg:ml-64 sm:ml-16">
        <div className="flex items-center content-center justify-center w-full h-screen">
          <h1 className="inline-block mx-auto text-lg text-black dark:text-white">
            No saved post found
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Saved;
