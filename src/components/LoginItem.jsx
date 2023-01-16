import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loginUsername,loginUserId,loginDesc } from "../store/LoginSlice";





const LoginItem = () => {
  const navigate = useNavigate();
  const email = useRef();
  const pass = useRef();
  const [loginError, setLoginError] = useState("none");
  const [loginuser, setLoginUser] = useState({});

  const dispatch = useDispatch();
  
  

  const clickLogin = (e) => {
    e.preventDefault();

    const loginItem = {
      email: email.current.value,
      password: pass.current.value,
    };
    console.log(loginItem)
    // try {
    const getUser = async () => {
      const response = await axios.post("/login", loginItem);
      return response.data;
      // .then((response) => response).then((data) => {setUser(data)})
    };
    getUser().then((user) => setLoginUser(user))
    // dispatch(loginUsername(loginuser.username))
    // console.log(0,username)
    // alert("ログインしました");
      // navigate("/",{state:loginuser});
    // } catch (err) {
    // setLoginError("block");
    // }

  };
  dispatch(loginUsername(loginuser.username))
  dispatch(loginUserId(loginuser.userId))
  dispatch(loginDesc(loginuser.desc))

  const loginArray = Object.keys(loginuser)
  console.log(33, loginuser.username);
  if(loginArray.length > 0) {
    window.localStorage.setItem('id',loginuser.id);
    navigate("/")
  } else {
    alert("ユーザーが見つかりません")
  }

  return (
    <div class="bg-orange-200 w-3/5 h-32 mx-auto">
      <div>
        <h1>ログイン</h1>
        <form onSubmit={(e) => clickLogin(e)}>
          <div>
            <label htmlFor="email">Eメール</label>
            <input type="email" placeholder="Eメール" id="email" ref={email} />
          </div>
          <div>
            <label htmlFor="pass">パスワード</label>
            <input
              type="password"
              placeholder="パスワード"
              id="pass"
              ref={pass}
            />
          </div>
          <p style={{ display: loginError }}>ユーザーが見つかりません</p>
          <button>ログイン</button>
        </form>
      </div>
    </div>
  );
};



export default LoginItem;



// export const MyContext = createContext();
// console.log(MyContext)
