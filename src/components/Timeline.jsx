import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./posts/Post";
import Share from "./posts/Share";
import axios from "axios";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);

  const data = localStorage.getItem("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/post");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const currentUser = async () => {
      const response = await axios.get(`/profile/${data}`);
      setUserData(response.data);
    };
    currentUser();
  }, [posts]);

  const followUser = userData.followings?.map((user) => user.userId);

  followUser?.push(userData.userId);

  const newPost = posts.filter((item) => followUser?.includes(item.userId));

  return (
    <div class="bg-white basis-2/4">
      <Share userData={userData} />
      {newPost.map((followpost) => {
        return (
          <Post post={followpost} key={followpost.id} userData={userData} />
        );
      })}
    </div>
  );
};

export default Timeline;
