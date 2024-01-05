"use client";
import React from "react";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import Header from "@/components/Header";
import { useFormik } from "formik";
import create_category from "../../../../../../server/category/create-category";
import toast from "react-hot-toast";
import { CategoryEnum } from "../../../../../../server/category/types";

{
  /*const change = (args: any) => {
  document.getElementById("preview")!.style.backgroundColor =
    args.currentValue.hex;
}*/
}

const ColorPicker = () => {
  const change = (args: any) => {
    formik.setFieldValue("color", args.currentValue.hex);
  };

  const formik = useFormik({
    initialValues: {
      color: "",
      label: "",
    },
    onSubmit: async ({ color, label }) => {
      const res = await create_category(label, color);
      if (res == CategoryEnum.Exist)
        toast.error("Cette catégorie existe déjà !");
      else toast.success("Catégorie créée avec succès !");
    },
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Créer une Catégorie" />
      <div className="text-center">
        <div id="preview" />
        <div className="flex justify-center items-center gap-20 flex-wrap">
          <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                required
                onChange={formik.handleChange}
                name="label"
                value={formik.values.label}
                disabled={formik.isSubmitting}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Catégorie"
                aria-label="category"
              />
              <input
                required
                onChange={formik.handleChange}
                name="color"
                disabled={formik.isSubmitting}
                value={formik.values.color}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Couleur"
                aria-label="color"
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Créer
              </button>
            </div>
          </form>
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Pallete</p>
            <ColorPickerComponent
              value={formik.values.color}
              modeSwitcher={false}
              disabled={formik.isSubmitting}
              inline
              showButtons={false}
              change={change}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
