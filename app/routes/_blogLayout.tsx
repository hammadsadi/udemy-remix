import { Outlet } from "@remix-run/react";
import React from "react";

const BlogLayout = () => {
  return (
    <div>
      <header>Blog Navigation Now Implemented For About Page</header>
      <Outlet />
    </div>
  );
};

export default BlogLayout;
