// src/pages/Blog.jsx
import { Link } from "react-router-dom";
export default function Blog() {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];

  return (
    <div>
      <h1>📝 Blog</h1>
      {posts.map((p) => (
        <p key={p.id}>
          <Link to={`/blog/${p.id}`}>{p.title}</Link>
        </p>
      ))}
    </div>
  );
}