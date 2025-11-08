import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetail() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { slug } = useParams();

  const [post, setPost] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/posts/${slug}`);
        console.log("Post URL: ", `${API_URL}/posts/${slug}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError("Error fetching data");
      }
    };
    fetchPost();
  }, []);

  const handleEditPost = async () => {
    navigate(`/posts/${slug}/edit`);
  }

  const handleDeletePost = async () => {
    // Luôn xác định đúng slug để xoá post nên không cần try-catch
    if (confirm("Bạn có chắc chắn muốn xoá bài viết?")) {
      const res = await fetch(`${API_URL}/posts/${slug}`, {
        method: "delete"
      });
      navigate("/posts");
    }
  }

  return (
    <div>
      <h2>BLOG Page</h2>
      <hr />
      {error && <p>{error}</p>}
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <hr />
      <div id="modify-post">
        <button onClick={handleEditPost}>Edit post</button>
        <button onClick={handleDeletePost}>Delete post</button>
      </div>
    </div>
  );
}
