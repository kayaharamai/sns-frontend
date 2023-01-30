import React from "react";
import SearchInput from "./SearchInput";

const Rightbar: React.FC = () => {
  return (
    <div className="bg-white basis-1/4">
      <div className="bg-mygreen w-10/12 my-0 mx-auto max-h-screen rounded-3xl sticky top-0">
      <SearchInput />
      </div>
    </div>
  );
};

export default Rightbar;
