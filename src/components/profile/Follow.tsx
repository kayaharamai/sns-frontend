import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FollowItem } from "../../types/Types";

const Follow = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { state } = useLocation();
  const [followList, setfollowList] = useState<FollowItem[]>([]);

  useEffect(() => {
    setfollowList(state.state.followings);
  }, []);

  const clickReturn = () => {
    navigate(`/profile/${params.id}`);
  };

  console.log(followList)

  return (
    <div>
      <div>
        <button onClick={clickReturn}>
          <ArrowBack />
        </button>
      </div>
      <div className="bg-mygreen w-4/12 my-6 mx-auto p-3 rounded-3xl">
        <h1 className="pb-3 ml-2 mt-6 font-semibold text-lg">フォロー中一覧</h1>
        <ul>
          {followList?.map((followUser) => {
            return (
              <React.Fragment key={followUser.userId}>
                <li className="ml-2 mb-2"><Link to={`/profile/${followUser.followerId}`}>{followUser.userId}</Link></li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Follow;
