import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { FollowerItem } from "../../types/Types";

const Follower = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { state } = useLocation();
  const [followerList, setfollowerList] = useState<FollowerItem[]>([]);

  const clickReturn = () => {
    navigate(`/profile/${params.id}`);
  };

  useEffect(() => {
    setfollowerList(state.state.followers);
  }, []);
console.log(followerList)
  return (
    <div>
      <div>
        <button onClick={clickReturn}>
          <ArrowBack />
        </button>
      </div>
      <div className="bg-mygreen w-4/12 my-6 mx-auto p-3 rounded-3xl">
        <h1 className="pb-3 ml-2 mt-6 font-semibold text-lg">フォロワー一覧</h1>
        <ul>
          {followerList?.map((followerUser) => {
            return (
              <React.Fragment key={followerUser.userId}>
                <li className="ml-2 mb-2"><Link to={`/profile/${followerUser.followId}`}>{followerUser.userId}</Link></li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Follower;
