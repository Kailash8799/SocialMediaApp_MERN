import React from "react";

const User = () => {
  return (
    <button class="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl p-2">
      <div class="flex text-black dark:text-white items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        H
      </div>
      <div class="ml-2 text-black dark:text-white text-sm font-semibold">Henry Boyd</div>
    </button>
  );
};

export default User;
