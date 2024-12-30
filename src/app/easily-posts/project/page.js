"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/app/components/ui/typography";

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
    return (
      <div className="flex justify-center mt-10">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-5 text-center">
        <p className="text-red-500 font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto mt-16">
      <TypographyH1 className="text-orange-600 mb-6 text-center">
        EasilyPosts
      </TypographyH1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <CardHeader>
              <CardTitle>
                <TypographyH2 className="text-orange-500">
                  {post.title}
                </TypographyH2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP className="text-gray-700">
                <strong>카테고리:</strong> {post.category}
              </TypographyP>
              <TypographyP className="text-gray-700">
                <strong>작성자:</strong> {post.author.name}
              </TypographyP>
              <TypographyP className="text-gray-500 text-sm">
                <strong>생성일:</strong> {post.createdAt}
              </TypographyP>
              <TypographyP className="text-gray-500 text-sm">
                <strong>조회수:</strong> {post.views} | <strong>댓글:</strong>{" "}
                {post.commentCount}
              </TypographyP>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
