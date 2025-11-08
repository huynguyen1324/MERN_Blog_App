import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { slug } = useParams();
  
  const [post, setPost] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/posts/${slug}`);
        console.log("Post URL: ", `${API_URL}/posts/${slug}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(true);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <h2>BLOG Page</h2>
      <hr/>
      {error && <p>Error fetching data</p>}
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
}
