"use client";
import { Category } from "@prisma/client";
import React from "react";
import remove_category from "../../../../../server/category/remove_category";
import { Chip } from "@nextui-org/react";

export default function CategoryC(category: Category) {
  return (
    <div className=" flex gap-4">
      <Chip
        onClose={() => remove_category(category.id)}
        size="lg"
        style={{ backgroundColor: category.color, color: "white" }}
      >
        {category.label}
      </Chip>
    </div>
  );
}
