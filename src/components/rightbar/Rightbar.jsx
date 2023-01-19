import React from "react";
import SearchInput from "./SearchInput";
import UserSearch from "./UserSearch";

const Rightbar = () => {
  return (
    <div class="bg-white basis-1/4">
      <div class="bg-mygreen w-10/12 my-0 mx-auto h-5/6 rounded-3xl">
      <SearchInput />
      {/* <UserSearch /> */}
      </div>
    </div>
  );
};

export default Rightbar;
