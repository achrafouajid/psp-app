"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import create_blog from "../../../../../server/blog/create_blog";
import { Category } from "@prisma/client";
import Editor from "./Editor";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { CategoryEnum } from "../../../../../server/category/types";

export default function AddBlog(props: { categories: Category[] }) {
  const { currentColor } = useStateContext();
  const [content, setcontent] = useState("");
  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      categories: [],
      content: "",
    },
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("image", values.image);
      formdata.append("title", values.title);
      formdata.append("content", values.content);
      formdata.append("categories", JSON.stringify(values.categories));
      formdata.set("content", content);
      const res = await create_blog(formdata);
      if (res == CategoryEnum.Success) {
        toast.success("Module Educatif créé avec succès !");
        formik.resetForm();
      } else {
        toast.error("Erreur lors de la création du module Educatif !");
      }
    },
  });
  return (
    <div className=" w-full mx-4 rounded-lg p-8">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
