"use client";
import React from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";

export default function ThirdRequest() {
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "01/01/1950",
      address: "",
      notes: "",
    },
    onSubmit: async (values) => {
      toast.success("Dossier patient créé avec succès !");
    },
  });
  return (
    <div className="w-full mt-20">
      <form
        className="w-full border border-[#f17c34] rounded-lg p-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Date de la demande
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
              onChange={formik.handleChange}
              name="birthDate"
              value={formik.values.birthDate}
              disabled={formik.isSubmitting}
              type="date"
              placeholder="01/01/1920"
            />
          </div>
        </div>

        <div className=" mb-6">
          <label
            className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Remarques
          </label>
          <div className="relative">
            <textarea
              className=" rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="notes"
              value={formik.values.notes}
              disabled={formik.isSubmitting}
            ></textarea>
          </div>
        </div>
        <label
          className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Documents:
        </label>
        <div className="border border-dashed border-gray-500 relative">
          <input
            type="file"
            multiple
            className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
          />
          <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
            <h4>
              Glissez les documents ici
              <br />
              ou
            </h4>
            <p className="">Selectionner documents</p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Soummettre"
            borderRadius="10px"
            width="50px"
            disabled={formik.isSubmitting}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
