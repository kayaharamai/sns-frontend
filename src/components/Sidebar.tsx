import { Favorite, Home, Person, Settings } from "@mui/icons-material";
import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const data: string | null = localStorage.getItem("id");

  const clickLogout = () => {
    localStorage.removeItem("id");
    alert("ログアウトしました");
    navigate("/login");
  };

  const clickProfile = () => {
    navigate(`/profile/${data}`);
    window.location.reload();
  };

  return (
    <div className="bg-white basis-1/4">
      <div className="content-around">
        <ul>
          <li className="m-1 lg:m-3 xl:m-8 bg-mygreen w-10 lg:w-1/2 xl:w-1/2 p-2 lg:p-2 xl:p-2  rounded-3xl shadow-md hover:shadow-none">
            <Home />
            <Link to="/home">
              <span className="ml-2 text-xs lg:text-sm xl:text-base hidden md:inline-block">ホーム</span>
            </Link>
          </li>
          <li className="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Person />
            <span onClick={clickProfile} className="cursor-pointer ml-2">
              プロフィール
            </span>
          </li>
          <li className="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Settings />
            <Link to="/setting">
              <span className="ml-2">設定</span>
            </Link>
          </li>
        </ul>
        <button
          className="relative rounded-full m-8 px-5 py-2.5 overflow-hidden group bg-myblue hover:bg-gradient-to-r hover:from-opacity-80 hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-myblue transition-all ease-out duration-300"
          onClick={clickLogout}
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative font-semibold">ログアウト</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
