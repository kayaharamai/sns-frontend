import React from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/Sidebar";
import LikeContents from "../../components/LikeContents";

const Like: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <LikeContents />
      <Rightbar />
    </div>
  );
};

export default Like;
