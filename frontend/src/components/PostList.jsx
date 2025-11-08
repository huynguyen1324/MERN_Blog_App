import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PostList() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/posts`);
        console.log("PostList URL: ", `${API_URL}/posts`);
        const data = await res.json();
        setPosts(data);
        setError(false);
      } catch (err) {
        setError(true);
      }
    }
    fetchPosts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/posts/search?keyword=${keyword}`);
      console.log("Search post URL: ", `${API_URL}/posts/search?keyword=${keyword}`);
      const data = await res.json();
      setPosts(data);
      setError(false);
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div>
      <h2>BLOG Page</h2>
      <button onClick={() => navigate("/new-post")}>New post</button>
      <form id="search-post-form" onSubmit={handleSearch}>
        <input type="text" placeholder="Search post..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <br />
      <hr />
      {error && <p>Error fetching data</p>}
      {posts.length === 0 && !error && <p>No posts found</p>}
      {posts.map((post) => (
        <Link to={`/posts/${post.slug}`}>
          <h3>{post.title}</h3>
        </Link>
      ))}
    </div>
  );
}
