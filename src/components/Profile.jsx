import React, { useContext, useEffect, useState } from "react";
import SideNavbar from "./subcomponents/SideNavbar";
import { Theme } from "./context/ThemeProvider";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import Tweetpostcard from "./subcomponents/Tweets/Tweetcard";
import { useDispatch, useSelector } from "react-redux";
import SavedPost from "./Saved/SavedPost";
import ImagePost from "./subcomponents/ImagePost";
import OneVideo from "./subcomponents/Videoscomp/OneVideo";
import { setUser } from "../redux/actions/postaction";

const Profile = () => {
  const { setProgress, themeMode } = useContext(Theme);
  const [mounted, setisMounted] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [userprofile, setuserprofile] = useState({});
  const [userfound, setuserfound] = useState(false);
  const params = useParams();
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tweets");
  const [profiletweet, setprofiletweet] = useState([]);
  const [profileimages, setprofileimage] = useState([]);
  const [profilevideos, setprofilevideo] = useState([]);
  const [followloading, setfollowloading] = useState(false);
  const profile = useSelector((state) => state.setUser);
  const [isFolloweduser, setisFolloweduser] = useState(
    profile?.following?.includes(userprofile?._id)
  );
  const dispatch = useDispatch();

  const handleFollowerClick = () => {
    setFollowersList(dummyProfile.followers);
  };

  const handleFollowingClick = () => {
    setFollowingList(dummyProfile.following);
  };

  const tabs = [
    { label: "Tweets", value: "tweets" },
    { label: "Images", value: "images" },
    { label: "Videos", value: "savedPosts" },
  ];

  useEffect(() => {
    setProgress(0);
    setisMounted(true);
    try {
      (async () => {
        setfetching(true);
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/getuserwithdata`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
              username: params.username,
              token: localStorage.getItem("userlogintoken"),
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!postsdata.ok) {
          toast.error("Network error accured, Refresh page and try again!");
          return;
        }
        const posts = await postsdata.json();
        if (posts?.success) {
          setuserfound(true);
          setuserprofile(posts?.profile);
          setprofileimage(posts?.profileimage);
          setprofiletweet(posts?.profiletweet);
          setprofilevideo(posts?.profilevideo);
          dispatch(setUser(posts?.myprofile));
          setisFolloweduser(
            posts?.myprofile?.following.includes(posts?.profile?._id)
          );
          setfetching(false);
        } else {
          setuserfound(false);
          setfetching(false);
        }
      })();
    } catch (error) {
      setuserfound(false);
      setfetching(false);
    }
    setProgress(100);
  }, [dispatch, params.username, setProgress]);
  const followUser = async () => {
    setfollowloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/followuser`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            userid: userprofile?._id,
            token: localStorage.getItem("userlogintoken"),
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        setfollowloading(false);
        setisFolloweduser(false);
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        setisFolloweduser(true);
        toast.success(posts?.message + " " + userprofile?.username);
        setfollowloading(false);
        setisFolloweduser(true);
      } else {
        toast.error(posts?.message);
        setfollowloading(false);
      }
    } catch (error) {
      toast.error("Error");
      setfollowloading(false);
    }
  };
  const unfollowUser = async () => {
    setfollowloading(true);
    try {
      const postsdata = await fetch(
        `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/unfollowuser`,
        {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.REACT_APP_SECRET,
            userid: userprofile?._id,
            token: localStorage.getItem("userlogintoken"),
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!postsdata?.ok) {
        toast.error("Network error accured!");
        setfollowloading(false);
        setisFolloweduser(true);
        return;
      }
      const posts = await postsdata.json();
      if (posts?.success) {
        setisFolloweduser(false);
        toast.success(posts?.message + " " + userprofile?.username);
        setfollowloading(false);
        setisFolloweduser(false);
      } else {
        toast.error(posts?.message);
        setfollowloading(false);
      }
    } catch (error) {
      toast.error("Error");
      setfollowloading(false);
    }
  };
  if (!mounted) return;
  const dummyProfile = {
    userid: "12345",
    username: "exampleuser",
    useremail: "example@example.com",
    followers: ["Follower1", "Follower2", "Follower3"],
    following: ["Following1", "Following2"],
    savedpost: ["Saved Post 1", "Saved Post 2"],
    videos: ["Video 1", "Video 2", "Video 3"],
    profileImage: "https://via.placeholder.com/150",
    tweets: [
      "This is a tweet about something interesting.",
      "Another tweet to showcase the design.",
      "Tweeting away for demonstration purposes!",
    ],
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
  };
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <SideNavbar />
      {!fetching ? (
        userfound ? (
          <div className="flex flex-col lg:ml-64 sm:ml-16  justify-center py-8 ">
            {/* Left section: Profile details and follow button */}
            <div className="flex  items-center justify-between  mb-6 mx-10">
              <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
                <img
                  src={
                    userprofile?.profileImage
                      ? userprofile?.profileImage
                      : "/user.png"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-2"
                />
                <div className="text-center lg:text-left">
                  <div className="font-bold text-black dark:text-white text-xl mb-1">
                    {userprofile?.username ? userprofile?.username : "Guest"}
                  </div>
                  <div className="text-gray-600">
                    @{userprofile?.username ? userprofile?.username : "Guest"}
                  </div>
                  <div className="mt-2">
                    <span
                      className="mr-4 font-bold text-black dark:text-white cursor-pointer"
                      onClick={handleFollowerClick}
                    >
                      {userprofile?.followers?.length} Followers
                    </span>
                    <span
                      className="mr-4 font-bold text-black dark:text-white cursor-pointer"
                      onClick={handleFollowingClick}
                    >
                      {userprofile?.following?.length} Following
                    </span>
                    <span className="font-bold text-black dark:text-white">
                      {userprofile?.tweets?.length} Tweets
                    </span>
                  </div>
                </div>
              </div>
              {profile.username !== userprofile.username &&
                isFolloweduser &&
                (followloading ? (
                  <button
                    onClick={unfollowUser}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                  <ColorRing
                    visible={true}
                    height="25"
                    width="25"
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
                  /></button>
                ) : (
                  <button
                    onClick={unfollowUser}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Following
                  </button>
                ))}
              {profile.username !== userprofile.username &&
                !isFolloweduser &&
                (followloading ? (
                  <button
                    onClick={unfollowUser}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                  <ColorRing
                    visible={true}
                    height="25"
                    width="25"
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
                    onClick={followUser}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Follow
                  </button>
                ))}
            </div>
            <hr />

            {/* Right section: Tabs for switching content */}
            <div className="flex sticky top-16 bg-white dark:bg-black z-50 px-10 py-3.5">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`mr-4 ${
                    selectedTab === tab.value
                      ? "font-bold text-black dark:text-white"
                      : "text-black dark:text-white"
                  }`}
                  onClick={() => setSelectedTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Display content based on the selected tab */}
            {selectedTab === "tweets" && (
              <div className="m-10 space-y-4">
                <h2 className="font-bold mb-2 text-black dark:text-white">
                  Tweets
                </h2>
                {!fetching &&
                  profiletweet?.length !== 0 &&
                  profiletweet?.map((tweet, ind) => {
                    return (
                      <Tweetpostcard
                        caption={tweet?.tweet}
                        hashtags={tweet?.hashtags}
                        id={tweet?._id}
                        isLikedpost={tweet?.likes?.includes(profile?.userid)}
                        profileimg={tweet?.profileId?.profileImage}
                        time={tweet?.createdAt}
                        totalLikes={tweet?.likes?.length}
                        username={tweet?.profileId?.username}
                        key={ind}
                      />
                    );
                  })}
              </div>
            )}
            {selectedTab === "images" && (
              <div className="m-10">
                {profileimages.length === 0 || profileimages === undefined ? (
                  <div className="flex items-center content-center justify-center w-full h-screen">
                    <h1 className="inline-block mx-auto text-lg text-black dark:text-white">
                      No saved post found
                    </h1>
                  </div>
                ) : (
                  <div className="px-4 lg:px-10 sm:py-3 ">
                    <div className="grid md:grid-cols-2 gap-1 sm:gap-2">
                      {/* {profileimages?.map((id, ind) => {
                        return <SavedPost key={ind} id={id} />;
                      })} */}
                      {!fetching &&
                        profileimages?.map((item, ind) => {
                          return (
                            <ImagePost
                              key={ind}
                              src={item?.imageLink}
                              id={item?._id}
                              profileimg={item?.profileId?.profileImage}
                              username={item?.profileId?.username}
                              time={item?.createdAt}
                              caption={item?.caption}
                              hashtags={item?.hashtags}
                              totalLikes={item?.likes?.length}
                              totalComments={item?.comments?.length}
                              tagged={item?.tagged}
                              isLikedpost={item?.likes?.includes(
                                profile?.userid
                              )}
                              isSavedPost={profile?.savedpost?.includes(
                                item?._id
                              )}
                            />
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedTab === "savedPosts" && (
              <div className="m-10">
                {profilevideos.length === 0 || profilevideos === undefined ? (
                  <div className="flex items-center content-center justify-center w-full h-screen">
                    <h1 className="inline-block mx-auto text-lg text-black dark:text-white">
                      No saved video found
                    </h1>
                  </div>
                ) : (
                  <div className="px-4 lg:px-10 sm:py-3 ">
                    <div className="grid md:grid-cols-2 gap-1 sm:gap-2">
                      {/* {profileimages?.map((id, ind) => {
                        return <SavedPost key={ind} id={id} />;
                      })} */}
                      {!fetching &&
                        profilevideos?.map((item, ind) => {
                          return (
                            <OneVideo
                              key={item?._id}
                              id={item?._id}
                              isLikedpost={item?.likes?.includes(
                                profile?.userid
                              )}
                              isSavedPost={profile?.savedpost?.includes(
                                item?._id
                              )}
                              src={item?.profileId?.profileImage}
                              videoLink={item?.videoLink}
                              username={item?.profileId?.username}
                              time={item?.createdAt}
                              caption={item?.caption}
                              hashtags={item?.hashtags}
                              totalLikes={item?.likes?.length}
                            />
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Follower List */}
            {followersList.length > 0 && (
              <div className="mt-6">
                <h2 className="font-bold mb-2">Followers</h2>
                {followersList.map((follower, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-bold">{follower}</div>
                      <div>@{follower}</div>
                    </div>
                    <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Following List */}
            {followingList.length > 0 && (
              <div className="mt-6">
                <h2 className="font-bold mb-2">Following</h2>
                {followingList.map((following, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-bold">{following}</div>
                      <div>@{following}</div>
                    </div>
                    <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-black">
            <div className="min-h-screen w-full items-center bg-white dark:bg-black justify-center">
              <h1 className="text-black text-center pt-48 dark:text-white">
                User not found
              </h1>
              <h1 className="text-black text-center dark:text-white">
                Plesae check the username of that user and try again
              </h1>
            </div>
          </div>
        )
      ) : (
        <div className="min-h-screen bg-white dark:bg-black items-center justify-center flex">
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

export default Profile;
