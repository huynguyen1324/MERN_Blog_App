import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [slug, setSlug] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const createPost = async () => {
        try {
            const res = await fetch(`${API_URL}/posts/new`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({slug, title, content})
            });
            alert("Successfully creating new post!!");
            navigate("/posts");
        } catch (err) {
            setError(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (slug === "" || title === "" || content === "") {
            alert("Phải nhập đủ slug, title, content!!")
        } else {
            createPost();
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
            {error && <p>Error creating new post</p>}
        </div>
    )
}