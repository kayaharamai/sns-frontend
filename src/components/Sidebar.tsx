import {Home, Person, Settings } from "@mui/icons-material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const data : string | null = localStorage.getItem("id");
  console.log(data);

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
    <div className="bg-white basis-1/4 sticky top-0 left-0">
      <div className="content-around">
        <ul>
          <li className="m-8 bg-mygreen w-1/2 p-2 rounded-3xl shadow-md hover:shadow-none">
            <Home />
            <Link to="/home">
              <span className="ml-2">ホーム</span>
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
          className="relative rounded-full m-8 px-5 py-2.5 overflow-hidden group bg-mypink hover:bg-gradient-to-r hover:from-opacity-80 hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-mypink transition-all ease-out duration-300"
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
