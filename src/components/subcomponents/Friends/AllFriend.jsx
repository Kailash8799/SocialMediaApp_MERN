import React, { useEffect, useState } from "react";
import OneFriend from "./OneFriend";
import toast from "react-hot-toast";

const AllFriend = () => {
  const [mounted, setisMounted] = useState(false);
  const [allfriends, setallfriends] = useState([]);
  const [fetching, setfetching] = useState(false);
  const [profile, setProfile] = useState({});
  const [tkn, settkn] = useState();

  useEffect(() => {
    setisMounted(true);
    let token = localStorage.getItem("userlogintoken");
    if (token) {
      settkn(token);
      try {
        (async () => {
          setfetching(true);
          const postsdata = await fetch(
            `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/getalluser`,
            {
              method: "POST",
              body: JSON.stringify({
                token: token,
                secret: process.env.REACT_APP_SECRET,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!postsdata?.ok) {
            toast.error("Network error accured!");
            setallfriends([]);
            setfetching(false);
            return;
          }
          const posts = await postsdata.json();
          if (posts?.success) {
            setfetching(false);
            setallfriends(posts?.users);
            setProfile(posts?.profile);
          } else {
            setallfriends([]);
            setfetching(false);
          }
        })();
      } catch (error) {
        setallfriends([]);
        setfetching(false);
      }
    }
  }, []);

  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;

  return (
    <div className="grid grid-cols-2 gap-3 py-5 mx-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {allfriends?.map((item) => {
        return (
          item?._id !== profile?._id && (
            <OneFriend
              key={item?._id}
              id={item?._id}
              username={item?.username}
              image={item?.profileimage || "/user.png"}
              token={tkn}
              isFollowed={profile?.following?.includes(item?._id)}
            />
          )
        );
      })}
    </div>
  );
};

export default AllFriend;
