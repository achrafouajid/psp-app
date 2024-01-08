"use client";
import React from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { registerResponseEnum } from "../../../../../server/auth/types";
import addPatient from "../../../../../server/patient/add_patient";
import { ProgramEnum } from "@prisma/client";

export default function AddPatient() {
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "01/01/1950",
      address: "",
      program: ProgramEnum.PSP,
      notes: "",
    },
    onSubmit: async (values) => {
      const res = await addPatient(values);
      if (res.status == registerResponseEnum.exist)
        toast.error("Ce patient existe déjà  !");
      else {
        toast.success("Dossier patient créé avec succès !");
        formik.resetForm();
      }
    },
  });
  return (
    <div className="">
      <div className="w-full mx-4">
        <form
          className="w-full border border-[#f17c34] rounded-lg p-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
                onChange={formik.handleChange}
                name="lastName"
                value={formik.values.lastName}
                disabled={formik.isSubmitting}
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
              <p className="text-red-500 text-xs italic">
                * Veuillez remplir ces champs.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
                onChange={formik.handleChange}
                name="firstName"
                value={formik.values.firstName}
                disabled={formik.isSubmitting}
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Date de naissance
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
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Adresse
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="address"
              value={formik.values.address}
              disabled={formik.isSubmitting}
              id="grid-zip"
              type="text"
              placeholder="123 Rue A 20220"
            />
          </div>
          <div className=" mb-6 ">
            <label
              className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Programme
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={formik.handleChange}
                name="program"
                value={formik.values.program}
                disabled={formik.isSubmitting}
              >
                {Object.values(ProgramEnum).map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
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

          <div className=" mb-6">
            <label
              className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Notes
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
          <div className="flex flex-col items-center">
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
    </div>
  );
}
