import "./styles.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import PostList from "./components/PostList";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const Protected = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  }

  const logout = () => {
    if(confirm("Bạn có chắc muốn đăng xuất?")) {
      setUser(null);
      localStorage.removeItem("user");
    } else {
      
    }
  }

  return (
    <BrowserRouter>
      <nav id="nav">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/about">About</Link>
        {!user && <Link to="/login">Login</Link>}
        {user && <Link to="/login" onClick={logout}>Logout</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" >
            <Route index element={<Protected><PostList /></Protected>} />
            <Route path=":slug" element={<Protected><Post /></Protected>} />
        </Route>
        <Route path="/new-post" element={<Protected><NewPost /></Protected>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />}/>
      </Routes>
    </BrowserRouter>
  );
}
