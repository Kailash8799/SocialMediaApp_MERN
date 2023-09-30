import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { PlaySquare } from "lucide-react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import Commentcomp from "../Commentcomp";
const secret = process.env.REACT_APP_SECRET;

const CommentModal = () => {
  const {
    themeMode,
    setcommentModal,
    commentModalanimation,
    setcommentModalanimation,
    postid,
    setpostid,
  } = useContext(Theme);
  const [mounted, setMounted] = useState(false);
  const [allcomment, setallcomment] = useState([]);
  const [commentloading, setcommentloading] = useState(true);
  const [commentfetcherror, setcommentfetcherror] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (postid === "") {
      setcommentfetcherror(true);
      return;
    }
    (async () => {
      setcommentloading(true);
      try {
        const commentdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/fetchCommentontweet`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
              id: postid,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!commentdata.ok) {
          toast.error("Network error accured! refresh page and try again");
          return;
        }
        const comments = await commentdata.json();
        if (comments?.success) {
          setallcomment(comments?.comments);
          setcommentloading(false);
          setcommentfetcherror(false);
        } else {
          setcommentfetcherror(true);
          setcommentloading(false);
        }
      } catch (error) {
        toast.success("Error");
        setcommentloading(false);
        setcommentfetcherror(true);
      }
    })();

  }, [postid, setpostid]);
  if (!mounted) <div className="min-h-screen bg-white dark:bg-black"></div>;

  return (
    <div
      className="fixed w-screen h-screen selection:bg-none modal-backdrop"
      style={{ zIndex: 150 }}
    >
      <div
        onClick={() => {
          setcommentModalanimation(false);
          setTimeout(() => {
            setcommentModal(false);
            setpostid("");
          }, 500);
        }}
        className="fixed hidden cursor-pointer md:flex right-10 top-5 modal-backdrop"
      >
        <AiOutlineClose
          color={themeMode === "dark" ? "white" : "black"}
          size={30}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <AnimatePresence>
          {commentModalanimation && (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              className={`h-[570px] relative overflow-y-auto rounded-lg mx-3 max-w-xl w-full shadow-inner dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white `}
            >
              <div
                className={`h-12 dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white  border-b sticky top-0 z-50  items-center flex justify-between border-slate-300 dark:border-slate-800 px-3`}
              >
                <div className="items-center justify-center transition-all border-green-200 md:mx-auto">
                  <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
                    Comments
                  </h1>
                </div>
                <div>
                  <motion.div
                    onClick={() => {
                      setcommentModalanimation(false);
                      setTimeout(() => {
                        setcommentModal(false);
                        setpostid("");
                      }, 500);
                    }}
                    initial={{ x: 100, y: -100 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    exit={{
                      x: 100,
                      y: -100,
                    }}
                    className="items-center justify-center cursor-pointer md:hidden"
                  >
                    <AiOutlineClose
                      color={themeMode === "dark" ? "white" : "black"}
                      size={24}
                    />
                  </motion.div>
                </div>
              </div>
             {allcomment.length > 0 && <div className="mx-2 mt-3 overflow-y-auto">
                {allcomment?.map((onecomment, key) => {
                  return (
                    <Commentcomp
                      key={key}
                      comment={onecomment?.comment}
                      username={onecomment?.profileId?.username}
                      profileImage={onecomment?.profileId?.profileImage}
                      createdAt={onecomment?.createdAt}
                      id={onecomment?._id}
                      tweetid={postid}
                    />
                  );
                })}
              </div>}
              {allcomment.length === 0 && <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-black dark:text-white">No comment found</h1>
              </div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommentModal;
