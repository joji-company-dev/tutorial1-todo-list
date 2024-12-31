import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns {Promise<Response>}
 */
export async function GET(request) {
  const categories = request.nextUrl.searchParams.get("categories");
  return fetch(
    `https://easily-api.jojicompany.com/posts?categories=${categories}`
  );
}
