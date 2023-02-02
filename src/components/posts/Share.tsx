import axios, { AxiosResponse } from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { NewPost } from "../../types/Types";
import { Add, Update } from "@mui/icons-material";
import PostModal from "./PostModal";

const Share: React.FC<{ userData: any }> = (userData) => {
  const [post, setPosts] = useState<NewPost[]>([]);
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const desc = useRef<HTMLTextAreaElement>(null!);
  const data: string | null = localStorage.getItem("id");

  console.log(userData, 109);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: NewPost = {
      authorId: Number(data),
      desc: desc.current.value,
      userId: userData.userData.userId,
      username: userData.userData.username,
    };

    if (desc.current.value !== "") {
      await axios.post("/post", newPost).then((response) => {
        axios.get("/post").then((response: AxiosResponse<NewPost[]>) => {
          setPosts(response.data);
        });
      });
      window.location.reload();
    } else {
      setAlertMessage(true);
    }
    localStorage.removeItem("post");
  };

  const clickPost = () => {
    window.localStorage.setItem("post", "open");
    setEditModalIsOpen(true);
  };
  const postOpen = localStorage.getItem("post");

  const clickUpdate = () => {
    window.location.reload();
  };

  console.log(editModalIsOpen, 13);

  return (
    <div className="border-b-4">
      <form onSubmit={(e) => handleSubmit(e)} className="m-4">
        <div>
          {postOpen !== "open" ? (
            <h1 className="pb-3 ml-2 mt-8 font-semibold text-lg">ホーム</h1>
          ) : (
            ""
          )}

          <ul className="flex p-2">
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="profile"
                className="w-10 mr-3 rounded-full"
              />
            </li>
            <li>
              <textarea
                placeholder="いまなにしてる？"
                ref={desc}
                className=""
                cols={60}
              ></textarea>
            </li>
          </ul>
          {alertMessage ? (
            <p className="ml-8 text-red-500 text-sm">文字を入力してください</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <ul className="flex justify-between">
            <li className="items-center"></li>
            <li>
              <button
                className="relative rounded-full m-8 px-5 py-2.5 overflow-hidden group bg-mypink hover:bg-gradient-to-r hover:from-opacity-80 hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-mypink transition-all ease-out duration-300"
                type="submit"
              >
                <span className="absolute right-0 w-8 h-32　-mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-semibold">投稿する</span>
              </button>
            </li>
          </ul>
        </div>
      </form>
      {postOpen !== "open" ? (
        <button
          onClick={clickUpdate}
          className="px-2 py-1 mr-0 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
        >
          <Update />
        </button>
      ) : (
        ""
      )}

      <div className="">
        {!editModalIsOpen ? (
          <div>
            {postOpen !== "open" ? (
              <div className="fixed z-50 bg-mypink p-3 rounded-3xl bottom-10 right-96">
                <button onClick={clickPost}>
                  <Add />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {editModalIsOpen ? (
          <PostModal
            editModalIsOpen={editModalIsOpen}
            setEditModalIsOpen={setEditModalIsOpen}
            userData={userData}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Share;
