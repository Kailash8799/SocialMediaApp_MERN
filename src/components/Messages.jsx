import React, { useContext, useEffect, useState } from "react";
import Received from "./subcomponents/messages/Received";
import Sender from "./subcomponents/messages/Sender";
import User from "./subcomponents/messages/User";
import { Theme } from "./context/ThemeProvider";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import  io  from "socket.io-client";

// const socket = io.connect(process.env.REACT_APP_LOCALHOST_KEY)

const Messages = () => {
  const [chatusers, setChatusers] = useState([]);
  const { setProgress, themeMode } = useContext(Theme);
  const [mounted, setisMounted] = useState(false);
  const [fetching, setfetching] = useState(true);
  const profile = useSelector((state) => state.setUser);
  const [selectedchat,setselectedchat] = useState(null);

  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    try {
      (async () => {
        setfetching(true);
        const getfolllowers = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/getFollowers`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
              token: localStorage.getItem("userlogintoken"),
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!getfolllowers.ok) {
          toast.error("Network error accured! refresh page and try again");
          return;
        }
        const posts = await getfolllowers.json();
        if (posts?.success) {
          setfetching(false);
          setChatusers(posts?.profiles);
        } else {
          setChatusers([]);
          setfetching(false);
        }
      })();
    } catch (error) {
      setChatusers([]);
      setfetching(false);
    }
    setProgress(100);
  }, [setProgress]);

  if (!mounted) return;

  // const joinRoom = ()=>{
  //   if(selectedchat === null){
  //     toast.error("Select user");
  //   }
  //   socket.emit("join_room",)
  // }

  return (
    <div className="bg-white dark:bg-black min-h-screen w-full">
      {!fetching ? (
        chatusers.length !== 0 ? (
          <div className="overflow-hidden overflow-y-hidden selection:bg-none overdlowiny dark:bg-black">
            <div className="flex overflow-hidden antialiased text-gray-800">
              <div className="flex flex-row h-[92vh] no-scrollbar overflow-hidden w-full overflow-x-hidden">
                <div className="flex-col flex-shrink-0 hidden w-64 h-screen py-8 pl-6 pr-2 bg-white md:flex dark:bg-black">
                  <div className="flex flex-row items-center justify-center w-full h-12">
                    <div className="flex items-center justify-center w-10 h-10 text-indigo-700 bg-indigo-100 rounded-2xl">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-2 text-2xl font-bold">QuickChat</div>
                  </div>
                  <div className="flex flex-col items-center w-full px-4 py-6 mt-4 bg-indigo-100 border border-gray-200 rounded-lg dark:border-slate-700 dark:bg-slate-900">
                    <div className="w-20 h-20 overflow-hidden border rounded-full">
                      <img
                        src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                        alt="Avatar"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="mt-2 text-sm dark:text-white text-black font-semibold">
                      {profile?.username ? profile?.username : "Username"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Lead UI/UX Designer
                    </div>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div className="flex flex-row items-center justify-between text-xs">
                      <span className="font-bold">Active Conversations</span>
                      <span className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full">
                        4
                      </span>
                    </div>
                    <div className="flex flex-col h-64 mt-4 -mx-2 space-y-1 overflow-y-scroll scrollbardesign ">
                      {chatusers?.map((user, ind) => {
                        return (
                          <User
                            key={user._id + ind.toString()}
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                            user={user}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-auto h-full md:p-6">
                  <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 md:rounded-2xl dark:bg-black dark:border border-slate-800">
                    <div className="flex flex-col h-full mb-4 overflow-x-auto scrollbardesign">
                      <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />

                          <Sender
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Sender
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />

                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Sender
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          <Received
                            profileImage={
                              "https://avatars3.githubusercontent.com/u/2763884?s=128"
                            }
                          />
                          {/* <div className="col-start-1 col-end-10 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                          A
                        </div>
                        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                          <div className="flex flex-row items-center">
                            <button className="flex items-center justify-center w-10 h-8 bg-indigo-600 rounded-full hover:bg-indigo-800">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </button>
                            <div className="flex flex-row items-center ml-4 space-x-px">
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-4 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-8 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-8 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-10 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-10 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-12 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-10 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-6 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-5 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-4 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-3 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-10 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-10 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-8 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-8 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-8 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-8 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-2 bg-gray-500 rounded-lg"></div>
                              <div className="w-1 h-4 bg-gray-500 rounded-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center w-full h-16 px-4 bg-white dark:bg-slate-900 rounded-xl">
                      <div>
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div className="flex-grow ml-4">
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300 dark:text-white dark:bg-slate-700 pr-9"
                          />
                          <button className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl">
                          <span className="hidden md:block">Send</span>
                          <span className="ml-2 my-1.5">
                            <svg
                              className="w-4 h-4 -mt-px transform rotate-45"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen w-full items-center bg-white dark:bg-black justify-center">
            <h1 className="text-black text-center pt-48 dark:text-white">You have no common followers</h1>
            <h1 className="text-black text-center dark:text-white">If you and user both are following each other then you can chat with each other </h1>
            <h1 className="text-black text-center dark:text-white">If you want to chat then follow each other </h1>
          </div>
        )
      ) : (
        <div className="min-h-screen items-center justify-center flex">
          <RotatingLines
            strokeColor={themeMode === "dark" ? "#fff" : "black"}
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default Messages;
