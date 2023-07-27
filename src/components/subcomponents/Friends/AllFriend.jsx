import React, { useEffect, useState } from "react";
import OneFriend from "./OneFriend";

const AllFriend = () => {
  const [mounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  const friends = [
    { id: "12345tfcvbf" },
    { id: "dfbvhfdxchfgds" },
    { id: "cvbghfrtesdzccb" },
    { id: "cvbghfrteszxcvbdzccb" },
    { id: "cvbghzxcvfrtesdzccb" },
    { id: "cvcxvbbghfrtesdzccb" },
    { id: "cvcxvbbghfrtesdccczccb" },
    { id: "cvcxvbbghfrccctesdccczccb" },
    { id: "cvcxvbbgddhfrccctesdccczccb" },
    { id: "c" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 py-5 mx-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {friends.map((item) => {
        return <OneFriend key={item?.id}/>;
      })}
    </div>
  );
};

export default AllFriend;
