import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./posts/Post";
import Share from "./posts/Share";
import axios, { AxiosResponse } from "axios";
import { Posts, UserData } from "../types/Types";

const Timeline: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [userData, setUserData] = useState<any>([]);
  const data: string | null = localStorage.getItem("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios
        .get("/post")
        .then((responses: AxiosResponse<Posts[]>) => setPosts(responses.data));
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const currentUser = async () => {
      const response = await axios
        .get(`/profile/${data}`)
        .then((responses: AxiosResponse<UserData[]>) =>
          setUserData(responses.data)
        );
    };
    currentUser();
  }, [posts]);

  const followUser: string[] = userData.followings?.map(
    (user: UserData) => user.userId
  );

  followUser?.push(userData.userId);

  const newPost: Posts[] = posts.filter((item: Posts) =>
    followUser?.includes(item.userId)
  );

  return (
    <div className="bg-white basis-2/4 max-h-screen overflow-scroll">
      <div>
        <Share userData={userData} />
        {newPost.map((followpost: Posts) => {
          return (
            <React.Fragment key={followpost.id}>
              <Post post={followpost} key={followpost.id} userData={userData} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
