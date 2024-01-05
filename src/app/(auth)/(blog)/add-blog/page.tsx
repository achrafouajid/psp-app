import React from "react";

import Header from "@/components/Header";
import { EditorData } from "@/data/dummy";
import Editor from "./Editor";
import AddBlog from "./AddBlog";
import get_categories from "../../../../../server/category/get_categories";

export default async function page() {
  const data = await get_categories();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Editor" />
      <AddBlog categories={data} />
    </div>
  );
}
