import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Theme } from "./context/ThemeProvider";
const secret = process.env.REACT_APP_SECRET;

export default function Verifyuser() {
  const searchParams = useSearchParams();
  const [loading, setloading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [mounted, setmounted] = useState(false);
  const [token, settoken] = useState("");
  const navigate = useNavigate();
  const { setProgress } = useContext(Theme);

  useEffect(() => {
    setmounted(true);
    settoken(searchParams[0]?.get("token"));
    if (token) {
      setdisabled(false);
    }
  }, [searchParams, token]);
  useEffect(() => {
    setProgress(0);
    setProgress(100);
  }, [setProgress]);
  const verifyEmailAddress = async () => {
    if (!mounted) return;
    setloading(true);
    try {
      const responce = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/verifyuser`,
        {
          method: "POST",
          body: JSON.stringify({
            token: token,
            secret: secret,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!responce.ok) {
        toast.error("Network error accured! refresh page and try again");
        return;
      }
      const data = await responce.json();
      if (data.success) {
        toast.success(data?.message);
        navigate("/", { replace: true });
      } else {
        toast.error(data?.message);
      }
      setloading(false);
    } catch (error) {
      toast.error("Some error accured!");
      setloading(false);
    }
  };
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <div className="w-full h-full min-h-screen bg-white py-28 sm:py-32 sm:px-4 dark:bg-black">
        <div className="flex flex-col items-center justify-center">
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
              aria-label="Verify email address"
              className="text-2xl font-extrabold leading-6 text-gray-400 dark:text-gray-600"
            >
              Verify email address
            </p>

            <div className="flex items-center justify-between w-full py-5">
              <hr className="w-full bg-gray-400" />
            </div>
            <div className="mt-8">
              {loading ? (
                <button
                  aria-label="create my account"
                  className="items-center justify-center w-full py-2 text-xl font-bold leading-none text-center text-white transition-transform border rounded focus:ring-indigo-700 focus:outline-none dark:border-slate-700 bg-gradient-to-tl from-pink-500 to-blue-400 border-slate-200 hover:from-slate-500 hover:to-white"
                >
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{ margin: "auto" }}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </button>
              ) : (
                <button
                  disabled={disabled}
                  aria-label="create my account"
                  onClick={verifyEmailAddress}
                  className="w-full py-4 text-xl font-bold leading-none text-white transition-transform border rounded focus:ring-indigo-700 focus:outline-none dark:border-slate-700 bg-gradient-to-tl from-pink-500 to-blue-400 border-slate-200 hover:from-slate-500 hover:to-white disabled:from-pink-300 disabled:to-blue-300"
                >
                  Verify email
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
