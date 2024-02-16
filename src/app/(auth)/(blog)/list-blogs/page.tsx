import Header from "@/components/Header";
import React from "react";
import ManageBlogs from "./ManageBlogs";
import get_blogs from "../../../../../server/blog/get_blogs";

export default async function page() {
  const data = await get_blogs();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Module Education Patient" title="Liste des articles" />
      <ManageBlogs data={data} />
    </div>
  );
}
