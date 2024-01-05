"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import create_blog from "../../../../../server/blog/create_blog";
import { Category } from "@prisma/client";
import Editor from "./Editor";

export default function AddBlog(props: { categories: Category[] }) {
  const { currentColor } = useStateContext();
  const [content, setcontent] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.set("content", content);

    await create_blog(formData);
  }
  return (
    <div className="">
      <div className=" w-full mx-4">
        <form
          onSubmit={handleSubmit}
          className="w-full border border-[#f17c34] rounded-lg p-8"
        >
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Image
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="file"
              name="image"
              placeholder="Titre ..."
            />
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Titre du Blog
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              name="title"
              accept="image/*"
              placeholder="Titre ..."
            />
          </div>
          <div className=" mb-6 ">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
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

          {/*   <div className=" mb-6">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Notes
            </label>
            <div className="relative">
              <textarea className=" rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            </div>
          </div> */}
          <Editor onChange={setcontent} />

          <div className="flex flex-col items-center">
            <Button
              type="submit"
              onClick=""
              color="white"
              bgColor={currentColor}
              text="Soummettre"
              borderRadius="10px"
              width="50px"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
