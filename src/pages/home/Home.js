import React from "react";
import Timeline from "../../components/Timeline";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import { useLocation } from "react-router-dom";

const Home = () => {

  
  return (
    <div class="flex w-full h-screen">
      <Sidebar />
      <Timeline />
      <Rightbar />
    </div>
  );
};

export default Home;
