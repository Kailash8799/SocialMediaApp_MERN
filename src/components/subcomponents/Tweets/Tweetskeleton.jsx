import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton';
import { Theme } from '../../context/ThemeProvider';

const Tweetskeleton = () => {
    const { themeMode } = useContext(Theme);
    return (
      <div className="items-center selection:bg-none justify-center w-full py-3 mx-auto space-y-1 rounded-md shadow-inner shadow-slate-500 dark:shadow-slate-500 dark:border-b-[1px] border-slate-700 sm:mx-0 sm:max-w-xl">
        <div className="mx-3">
          <Skeleton
            baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
            height={40}
          />
        </div>
        <div className="mx-3">
          <Skeleton
            baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
            height={60}
          />
        </div>
        
        <div className="mx-3">
          <Skeleton
            baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
            height={40}
          />
        </div>
        <div className="mx-3">
          <Skeleton
            baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
            height={40}
          />
        </div>
        <div className="mx-3">
          <Skeleton
            baseColor={themeMode === "dark" ? "#D3D3D3" : "#E5E4E2"}
            height={40}
          />
        </div>
      </div>
    );
}

export default Tweetskeleton