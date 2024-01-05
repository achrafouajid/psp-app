"use client";
import { Category } from "@prisma/client";
import React from "react";
import remove_category from "../../../../../../server/category/remove_category";

export default function CategoryC(category: Category) {
  return (
    <div
      style={{ backgroundColor: category.color }}
      className="flex px-4 py-2 rounded-full text-white mt-4 justify-between"
    >
      {category.label}
      <button className="" onClick={() => remove_category(category.id)}>
        x
      </button>
    </div>
  );
}
