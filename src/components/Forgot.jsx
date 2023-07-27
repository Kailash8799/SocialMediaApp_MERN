import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Theme } from "./context/ThemeProvider";
// eslint-disable-next-line
const secret = process.env.REACT_APP_SECRET;

function Forgot() {
  const {setProgress} = useContext(Theme)
  const [mounted,setisMounted] = useState(false)
  useEffect(()=>{
    setProgress(0)
    setisMounted(true)
    setProgress(100)
  },[setProgress])
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
    <div className="w-full h-full min-h-screen py-24 bg-white sm:px-4 dark:bg-black">
      <div className="flex flex-col items-center justify-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full p-10 rounded shadow bg-gradient-to-tl dark:from-slate-600 dark:to-black from-white to-slate-300 lg:w-1/3 md:w-1/2"
        >
          <p
            tabIndex={0}
            aria-label="Forgot Password"
            className="text-2xl font-extrabold leading-6 text-gray-400 dark:text-gray-600"
          >
            Forgot Password
          </p>
          <p className="mt-4 text-sm font-medium leading-none text-gray-500 dark:text-slate-300">
            Already know password?&nbsp;
            <Link to={"/signin"}>
              <span
                tabIndex={0}
                role="link"
                aria-label="Sign up here"
                className="text-sm font-medium leading-none text-gray-800 underline cursor-pointer dark:text-slate-600"
              >
                Sign in here
              </span>
            </Link>
          </p>
          <div className="flex items-center justify-between w-full py-5">
            <hr className="w-full bg-gray-400" />

            <hr className="w-full bg-gray-400 " />
          </div>
          <div>
            <label className="text-sm font-medium leading-none text-gray-800 dark:text-slate-400">
              Email
            </label>
            <input
              aria-label="enter email adress"
              type="email"
              className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
            />
          </div>

          <div className="mt-8">
            <button
              aria-label="create my account"
              className="w-full py-4 text-lg font-bold leading-none text-white transition-transform border rounded focus:ring-indigo-700 focus:outline-none dark:border-slate-700 bg-gradient-to-tl from-pink-500 to-blue-400 border-slate-200 hover:from-slate-500 hover:to-white"
            >
              Forgot Password
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

export default Forgot;
