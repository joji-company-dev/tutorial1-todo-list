"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
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
        const formattedDate = json.data.map((post) => {
          const date = new Date(post.createdAt);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          return {
            ...post,
            formattedDate: `${year}/${month}/${day}`,
            formattedTime: `${hours}:${minutes}:${seconds}`,
          };
        });
        setPosts(Array.isArray(json.data) ? formattedDate : []);
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

  console.log(posts);

  return (
    <div className="mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-3xl font-bold text-left mb-4 text-orange-400 p-">
        📁공지사항📁
      </h1>
      <h3>공지사항을 확인할 수 있습니다</h3>
      {posts.map((post) => (
        <Alert key={post.id}>
          <Terminal className="h-4 w-4" />
          <AlertTitle className="text-xl">{post.title}</AlertTitle>
          <br />
          <AlertDescription className="text-gray-700">
            {post.category} <br />
            {post.author.name} ({post.author.email}) <br />
            Date : {post.formattedDate} <br />
            Time : {post.formattedTime} <br />
            Views : {post.views} <br />
            Comments : {post.commentCount} <br />
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
