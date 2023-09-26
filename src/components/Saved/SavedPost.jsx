import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ExplorePost from "../Explore/ExplorePost";

function SavedPost({ id }) {
  const [postdetails, setPostdetails] = useState(null);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const postsdata = await fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/getParticularpost`,
          {
            method: "POST",
            body: JSON.stringify({
              secret: process.env.REACT_APP_SECRET,
              id: id,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!postsdata?.ok) {
          toast.error("Network error accured!");
          return;
        }
        const posts = await postsdata.json();
        if (posts?.success) {
          setPostdetails(posts?.posts);
          setFetching(false);
        } else {
          toast.error(posts?.message);
          setFetching(false);
        }
      } catch (error) {
        toast.success("Error");
        setFetching(false);
      }
    })();
  }, []);

  return <ExplorePost img={postdetails?.imageLink} />;
}

export default SavedPost;
