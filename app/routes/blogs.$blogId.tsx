import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";

// Define Loader Function
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const res = await fetch(
    ` https://jsonplaceholder.typicode.com/posts/${params?.blogId}`
  );
  const blog = await res.json();
  return json({ blog });
};
const BlogDetails = () => {
  const { blog } = useLoaderData<typeof loader>();
  return (
    <div className="mt-7 text-center">
      <Link
        to="/"
        className="text-blue-500 py-2 px-4 bg-gray-800 mb-4 rounded-md"
      >
        Home
      </Link>
      <div className="bg-white dark:bg-gray-900 p-8 shadow-md rounded-lg space-y-2 max-w-md mx-auto">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p>{blog.body}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
