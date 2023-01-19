import React from "react";
import { useNavigate } from "react-router-dom";

const Top = () => {

    const navigate = useNavigate();

    const clickStart = () => {
        navigate("/login")
    }

  return (
    <div class="bg-mygreen h-screen">
      <div>
        <h1>SNS</h1>
        <button onClick={clickStart}>はじめよう</button>
        <img src={`${process.env.PUBLIC_URL}/top.png`} alt="topIcon"/>
      </div>
    </div>
  );
};

export default Top;
