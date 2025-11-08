import express from "express";
import cors from "cors";
import Posts from "./Posts.js";
import Users from "./Users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/posts", (req, res) => {
  res.json(Posts);
});

app.get("/posts/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase() || "";
  const posts = Posts.filter(p => 
    p.title.toLowerCase().includes(keyword) ||
    p.content.toLowerCase().includes(keyword)
  );
  res.json(posts);
});

app.post("/posts/new", (req, res) => {
  const post = req.body;
  Posts.push(post);
  res.sendStatus(200);
});

app.get("/posts/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = Posts.find(p => p.slug === slug);
  res.json(post);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const foundUser = Users.find(u => u.username === username && u.password === password);
  if (foundUser) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

app.listen(8080, () => {
  console.log("Server is running");
});
