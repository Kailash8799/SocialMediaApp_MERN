import { X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Theme } from "../context/ThemeProvider";

const OneStory = ({ src, id, userId, userProfileimg, username }) => {
  const [token, settoken] = useState("");
  const [ismounted, setisMounted] = useState(false);
  const profile = useSelector((state) => state.setUser);
  const { themeMode } = useContext(Theme);
  const [hidestory,sethidestory] = useState(false)
  useEffect(() => {
    setisMounted(true);
    const tk = localStorage.getItem("userlogintoken");
    if (tk) {
      settoken(tk);
    }
  }, []);
  const deleteimage = async () => {
    console.log("Hello");
    try {
      const postsdata = await toast.promise(
      fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/story/delete-story`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            storyId: id,
            token: token,
            link: src,
            userId: userId,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      ),{
        loading: "loading",
        success: "Story deleted",
        error: <b>Failed to delete</b>,
      });
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        sethidestory(true)
        toast.success(posts?.message);
      } else {
        toast.error(posts?.message);
      }
    } catch (error) {
      toast.success("Error");
    }
  };

  if (!ismounted) return;
  return (!hidestory ? <div className="h-48 mx-2 rounded-lg shadow-inner border-b-[1px] border-slate-300 dark:border-slate-800 storywidth cursor-pointer shadow-slate-400 dark:shadow-slate-600 flex-shrink-0 relative">
      <div style={{ zIndex: 40 }} className="absolute top-1 left-1">
        <div className="cursor-pointer">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="relative w-full overflow-hidden rounded-full img-container aspect-square">
              <img
                className="img-container transition border-[3px] border-blue-600 rounded-full w-11 h-11 hover:scale-105"
                src={userProfileimg || "./user.png"}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      {profile._id === userId && (
        <div onClick={()=>{
          deleteimage()
        }} style={{ zIndex: 50 }} className="absolute top-1 right-1">
                <div className="items-center justify-center w-6 h-full bg-pink-900">
                <X color={themeMode === "dark" ? "#fff" : "#000"} />
               
          </div>
        </div>
      )}

      <div className="h-full">
        <div className="relative w-full h-full overflow-hidden rounded-lg img-container aspect-auto">
          <img
            src={src}
            className="w-full h-full transition hover:scale-105"
            alt=""
            loading="lazy"
            style={{ width: "100%" }}
            srcSet=""
          />
        </div>
      </div>
      <div style={{ zIndex: 50 }} className="absolute bottom-1 mx-0.5">
        <h1 className="text-red-800">{username}</h1>
      </div>
    </div> : <div></div>
  );
};

export default OneStory;
