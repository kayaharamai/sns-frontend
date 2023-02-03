import React from "react";
import { useNavigate } from "react-router-dom";

const Top: React.FC = () => {
  const navigate = useNavigate();

  const clickStart = () => {
    navigate("/login");
  };

  return (
    <div className="bg-mygreen h-screen">
      <div className="w-5/12 py-20 mx-auto">
        <h1 className="text-5xl text-center mt-40">SNS</h1>
        <button
          onClick={clickStart}
          className="my-10 mx-auto flex rounded-full m-8 px-5 py-2.5 overflow-hidden font-semibold group bg-mypink hover:bg-gradient-to-r hover:from-opacity-80 hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-mypink transition-all ease-out duration-300"
        >
          はじめよう
        </button>
      </div>
    </div>
  );
};

export default Top;
