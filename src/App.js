import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Like from './pages/like/Like'
import Setting from './pages/setting/Setting'
import UserProfile from './pages/profile/UserProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/profile" element={<Profile />}></Route> */}
        <Route path="/profile/:id" element={<UserProfile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/like" element={<Like />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
