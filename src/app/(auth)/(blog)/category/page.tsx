import React from "react";
import Header from "@/components/Header";
import get_categories from "../../../../../server/category/get_categories";
import CategoryC from "./Category";
import AddCatPopUp from "./AddCatPopUp";

const Category = async () => {
  const data = await get_categories();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Blogs" title="Catégories" />
      <AddCatPopUp />
      {data.map((item: any, index: any) => (
        <CategoryC {...item} />
      ))}
    </div>
  );
};

export default Category;
