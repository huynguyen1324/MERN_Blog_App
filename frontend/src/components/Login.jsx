import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login( { setUser } ) {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authenticate = async () => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            if (res.status === 200) {
                alert("Đăng nhập thành công!!");
                setUser(username);
                localStorage.setItem("user", username);
                navigate("/");
            } else if (res.status === 401) {
                alert("Sai tài khoản hoặc mật khẩu")
            }
        } catch (err) {

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            alert("Phải nhập đủ username, password!!!")
        } else {
            authenticate();
        }
    }

    return (
        <div>
            <h2>LOGIN Page</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <p>Username</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}