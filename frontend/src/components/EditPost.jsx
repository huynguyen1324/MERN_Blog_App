import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const { slug } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/posts/${slug}`);
                const data = await res.json();
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                setError(true);
            }
        }
        fetchData();
    }, []);

    const updatePost = async () => {
        try {
            const res = await fetch(`${API_URL}/posts/${slug}`, {
                method: "put",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ slug, title, content })
            });
            alert("Successfully updating post!!");
            navigate(`/posts/${slug}`);
        } catch (err) {
            setError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (slug === "" || title === "" || content === "") {
            alert("Phải nhập đủ slug, title, content!!")
        } else {
            updatePost();
        }
    }

    return (
        <div>
            <h2>BLOG Page</h2>
            <hr />
            <form onSubmit={handleSubmit} id="new-post-form">
                <p>Enter slug</p>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                <p>Enter title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <p>Enter content</p>
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {error && <p>Error editing new post</p>}
        </div>
    )
}