import React, { useEffect } from "react";
import { LikePosts } from "../DummyData";
import LikePost from "./LikePost";

const Like = () => {

  const  data = localStorage.getItem('id');

  return (
    <div class="bg-purple-300 basis-2/4">
      {LikePosts.map((likepost) => {
        return <LikePost post={likepost} key={likepost.id} />
      })}
    </div>
  );
};

export default Like;
