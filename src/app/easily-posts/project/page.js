"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
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
      <div className="max-w-lg mx-auto mt-10 p-5">
        <TypographyH1 className="text-center text-gray-700 mb-6">
          Loading Posts...
        </TypographyH1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-5">
        <Alert variant="destructive">
          <AlertDescription>{`Error: ${error}`}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 space-y-6">
      <TypographyH1 className="text-center text-blue-600 mb-4">
        EasilyPosts
      </TypographyH1>
      {posts.map((post) => (
        <Card
          key={post.id}
          className="shadow-lg hover:shadow-2xl transition-shadow rounded-lg border border-gray-200"
        >
          <CardHeader className="bg-blue-50 p-4 rounded-t-lg">
            <CardTitle className="text-blue-700">
              <TypographyH2>{post.title}</TypographyH2>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <TypographyP className="mb-2 text-gray-700">
              <strong>Category:</strong> {post.category}
            </TypographyP>
            <TypographyP className="mb-2 text-gray-700">
              <strong>Author:</strong> {post.author.name} ({post.author.email})
            </TypographyP>
            <TypographyP className="mb-2 text-gray-700">
              <strong>Created At:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </TypographyP>
            <TypographyP className="text-gray-700">
              <strong>Views:</strong> {post.views} | <strong>Comments:</strong>{" "}
              {post.commentCount}
            </TypographyP>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
