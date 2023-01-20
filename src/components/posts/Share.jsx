import axios from "axios";
import { useState } from "react";
import { useRef } from "react";

const Share = (userData) => {
  const [count, setCount] = useState(0);
  const [post, setPosts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);

  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      authorId: userData.userData.id,
      desc: desc.current.value,
      userId: userData.userData.userId,
      username: userData.userData.username,
    };
    if (desc.current.value !== "") {
      await axios.post("/post", newPost).then((response) => {
        axios.get("/post").then((response) => {
          setPosts(response.data);
        });
      });
      window.location.reload();
    } else {
      setAlertMessage(true);
    }
  };

  console.log(post);

  return (
    <div class="border-b-4">
      <form onSubmit={(e) => handleSubmit(e)} class="m-4">
        <div>
          <h1 class="pb-3 ml-2 mt-8 font-semibold text-lg">ホーム</h1>
          <ul class="flex p-2">
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="profile"
                class="w-10 mr-3 rounded-full"
              />
            </li>
            <li>
              <textarea
                type="text"
                placeholder="いまなにしてる？"
                ref={desc}
                class=""
                cols={60}
                onChange={(e) => setCount(count + Number(1))}
              ></textarea>
            </li>
          </ul>
          {alertMessage ? (
            <p class="ml-8 text-red-500 text-sm">文字を入力してください</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <ul class="flex justify-between">
            <li class="items-center"></li>
            <li>
              <button
                class="relative rounded-full m-8 px-5 py-2.5 overflow-hidden group bg-mypink hover:bg-gradient-to-r hover:from-opacity-80 hover:to-opacity-80 text-white hover:ring-2 hover:ring-offset-2 hover:ring-mypink transition-all ease-out duration-300"
                type="submit"
              >
                <span class="absolute right-0 w-8 h-32　-mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative font-semibold">投稿する</span>
              </button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Share;
