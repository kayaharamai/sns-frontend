import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./posts/Post";
import Share from "./posts/Share";
// import { FollowPosts } from '../DummyData'
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
// import { MyContext } from "./LoginItem";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  // const [state, setState] = useContext(MyContext);
  // console.log(0,state)

  // const location = useLocation();
  // const loginuser = location.state;
  // console.log(100,loginuser)

  const data = localStorage.getItem("id");
  console.log("data", data);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/post");
      // console.log(response.data);
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
  console.log(followUser, 9090);
  console.log(posts, 100);

  followUser?.push(userData.userId);

  const newPost = posts.filter((item) => followUser?.includes(item.userId));
  console.log(newPost, 700);

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
