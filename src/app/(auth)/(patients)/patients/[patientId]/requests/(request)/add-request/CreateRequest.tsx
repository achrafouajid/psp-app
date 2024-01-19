"use client";
import React from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import newRequest from "../../../../../../../../../server/patient/requests/newRequest";
import getPatient from "../../../../../../../../../server/patient/get_patient";

export default function CreateRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getPatient>>>;
}) {
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      createdAt: new Date().toISOString().split("T")[0],
      remark: "",
    },
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("patientId", data.id);
      formdata.append("createdAt", values.createdAt);
      formdata.append("remark", values.remark);
      const res = await newRequest(formdata);
      toast.success("Demande de  patient créé avec succès !");
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
              Date Création de la Demande
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
              onChange={formik.handleChange}
              name="createdAt"
              value={formik.values.createdAt}
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
              className="rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="remark"
              value={formik.values.remark}
              disabled={formik.isSubmitting}
            ></textarea>
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
