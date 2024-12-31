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
        const response = await fetch("/api/posts?categories=INQUIRY");
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

          return {
            ...post,
            formattedDate: `${year}/${month}/${day}`,
            formattedTime: `${hours}:${minutes}`,
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
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl">Error: {error}</p>;
  }

  console.log(posts);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-3xl font-bold text-left mb-4">❓Q&A</h1>
      <h3>이즐리 운영자로부터 질문과 답변을 확인할 수 있습니다.</h3>
      {posts.map((post) => (
        <Alert key={post.id} className="m-3 rounded border-orange-500">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="text-lg text-bold">{post.title}</AlertTitle>
          <AlertDescription className="text-gray-700">
            <span className="text-sm text-orange-700">{post.author.name} </span>
            <span className="text-xs">
              {post.formattedDate} {post.formattedTime}
              {"    "}
            </span>
            <span className="text-xs text-gray-900">{post.views} views </span>
            <span className="text-xs text-orange-500">
              댓글:
              {post.commentCount}
            </span>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
