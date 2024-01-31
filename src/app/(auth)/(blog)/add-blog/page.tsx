import React from "react";

import Header from "@/components/Header";
import AddBlog from "./AddBlog";
import get_categories from "../../../../../server/category/get_categories";

export default async function page() {
  const data = await get_categories();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header category="Module Education Patient" title="Rédiger un Article" />
      <AddBlog categories={data} />
    </div>
  );
}
