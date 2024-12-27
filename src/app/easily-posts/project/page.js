"use client";
import { useEffect, useState } from "react";

export default function EasilyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setPosts(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">EasilyPosts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "20px" }}>
            <h2>{post.title}</h2>
            <p>
              <strong>Category:</strong> {post.category}
            </p>
            <p>
              <strong>Author:</strong> {post.author.name} ({post.author.email})
            </p>
            <p>
              <strong>Created At:</strong> {post.createdAt}
            </p>
            <p>
              <strong>Views:</strong> {post.views} | <strong>Comments:</strong>{" "}
              {post.commentCount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
