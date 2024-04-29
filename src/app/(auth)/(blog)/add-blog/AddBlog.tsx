"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import create_blog from "../../../../../server/blog/create_blog";
import { Category } from "@prisma/client";
import Editor from "./Editor";
import { toast } from "react-hot-toast"; // Import the toast function
import { Input } from "@nextui-org/react";

export default function AddBlog(props: { categories: Category[] }) {
  const { currentColor } = useStateContext();
  const [content, setcontent] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.set("content", content);

    try {
      await create_blog(formData);
      toast.success("Blog created successfully!"); // Display a success toast
    } catch (error) {
      toast.error("Failed to create blog. Please try again."); // Display an error toast
    }
  }
  return (
    <div className=" w-full mx-4 rounded-lg p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Image
          </label>
          <Input
            isRequired={true}
            id="grid-zip"
            type="file"
            name="image"
            placeholder="Titre ..."
          />
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Titre du Blog
          </label>
          <Input
            isRequired={true}
            id="grid-zip"
            type="text"
            name="title"
            accept="image/*"
            placeholder="Titre ..."
          />
        </div>
        <div className=" mb-6 ">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Catégories
          </label>
          <div className="relative">
            {props.categories.map((category) => (
              <div key={category.id} className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="categories"
                  className="accent-pink-500"
                  value={category.id}
                  id={category.id}
                />
                <label htmlFor={category.id} className="ml-2 text-sm">
                  {category.label}
                </label>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <Editor onChange={setcontent} />

        <div className="flex flex-col items-center">
          <Button
            type="submit"
            color="white"
            bgColor={currentColor}
            text="Soummettre"
            borderRadius="10px"
            width="50px"
          />
        </div>
      </form>
    </div>
  );
}
