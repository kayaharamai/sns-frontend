import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import UserProfile from "./pages/profile/UserProfile";
import Top from "./pages/top/Top";
import Like from "./pages/like/Like";
import Follow from "./components/profile/Follow";
import Follower from "./components/profile/Follower";
import LikeContents from "./components/LikeContents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile/:id" element={<UserProfile />}></Route>
        <Route path="/profile/:id/following" element={<Follow />}></Route>
        <Route path="/profile/:id/follower" element={<Follower />}></Route>
        <Route path="/profile/:id/like" element={<LikeContents />}></Route>
        <Route path="/like/:id" element={<Like />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
