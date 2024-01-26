{
  /*import { useFormik } from "formik";
import React from "react";
import createRegion from "../../../../server/region/create_region";
import { CategoryEnum } from "../../../../server/category/types";
import toast from "react-hot-toast";
import { City } from "@prisma/client";

export default function AddRegion() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({
      name,
    }: {
      name: string;
      city: City;
      attache: string;
    }) => {
      const res = await createRegion(name);
      if (res == CategoryEnum.Exist)
        toast.error("Cette catégorie existe déjà !");
      else toast.success("Catégorie créée avec succès !");
    },
  });
  return (
    <div className="text-center">
      <div id="preview" />
      <div className="flex justify-center items-center gap-20 flex-wrap">
        <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              required
              onChange={formik.handleChange}
              name="label"
              value={formik.values.name}
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
              value={formik.values.city}
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
        </div>
      </div>
    </div>
  );
}
*/
}
