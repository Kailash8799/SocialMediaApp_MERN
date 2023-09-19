import React, { useContext, useEffect, useState } from "react";
import SideNavbar from "./subcomponents/SideNavbar";
import { Theme } from "./context/ThemeProvider";
import { useSelector } from "react-redux";
import SavedPost from "./Saved/SavedPost";

const Saved = () => {
  const [mounted, setisMounted] = useState(false);
  const { setProgress } = useContext(Theme);
  const profile = useSelector((state) => state.setUser);

  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    setProgress(100);
  }, [setProgress]);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <div className="min-h-screen bg-white selection:bg-none dark:bg-black">
      <SideNavbar />
      <div className="lg:ml-64 sm:ml-16">
        {profile?.savedpost?.length === 0 || profile?.savedpost === undefined ? (
          <div className="flex items-center content-center justify-center w-full h-screen">
            <h1 className="inline-block mx-auto text-lg text-black dark:text-white">
              No saved post found
            </h1>
          </div>
        ) : (
          <div className="md:px-20 sm:py-3 sm:px-5">
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {profile?.savedpost?.map((id, ind) => {
                return <SavedPost key={ind} id={id} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
