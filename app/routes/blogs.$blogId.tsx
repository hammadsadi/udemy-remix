import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import React from "react";

// Define Loader Function
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const res = await fetch(
    ` https://jsonplaceholder.typicode.com/posts/${params?.blogId}`
  );
  const blog = await res.json();
  return json({ blog });
};

// Action For Data Update
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const res = await fetch(
    ` https://jsonplaceholder.typicode.com/posts/${params?.blogId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const data = await res.json();
  console.log(data);
  return json({ data });
};

const BlogDetails = () => {
  const { blog } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = !(navigation.state === "idle");
  return (
    <div className="mt-7 text-center max-w-md mx-auto">
      <Link
        to="/"
        className="text-blue-500 py-2 px-4 bg-gray-800 mb-4 rounded-md"
      >
        Home
      </Link>
      <div className="bg-white dark:bg-gray-900 p-8 shadow-md rounded-lg space-y-2 max-w-md mx-auto mb-3">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p>{blog.body}</p>
      </div>
      <Form method="patch">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="py-2 px-4 rounded-md"
          />
          <button className="bg-rose-500 py-2 px-4">
            {" "}
            {isSubmitting ? "Updating..." : "Update"}{" "}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default BlogDetails;
