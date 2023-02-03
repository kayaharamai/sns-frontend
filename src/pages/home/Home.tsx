import React from "react";
import Timeline from "../../components/Timeline";
import Sidebar from "../../components/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";

const Home: React.FC = () => {

  
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <Timeline />
      <Rightbar />
    </div>
  );
};

export default Home;
