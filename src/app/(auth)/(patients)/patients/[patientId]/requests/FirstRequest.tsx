"use client";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import newRequest from "../../../../../../../server/patient/requests/newRequest";
import getPatient from "../../../../../../../server/patient/get_patient";

export default function FirstRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getPatient>>>;
}) {
  const { currentColor } = useStateContext();
  const [imgPrvs, setimgPrvs] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      createdAt: new Date().toISOString().split("T")[0],
      remark: "",
      documents: [] as File[],
    },
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("patientId", data.id);
      formdata.append("createdAt", values.createdAt);
      formdata.append("remark", values.remark);
      values.documents.forEach((i) => formdata.append("documents", i));
      const res = await newRequest(formdata);
      toast.success("Demande de  patient créé avec succès !");
    },
  });
  useEffect(() => {
    setimgPrvs(formik.values.documents.map((i) => URL.createObjectURL(i)));

    return () => {
      imgPrvs.forEach((i) => URL.revokeObjectURL(i));
    };
  }, [formik.values.documents]);

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
        <label
          className="block uppercase tracking-wide text-[#0c545c] text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Documents à fournir:
        </label>
        <Dropzone
          onDrop={(acceptedFiles) =>
            formik.setFieldValue("documents", acceptedFiles)
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                className="border border-dashed border-gray-500 relative cursor-pointer w-full h-full p-20 z-50"
              >
                <input {...getInputProps()} />

                <p>
                  Glissez les documents à fournir ou Cliquez ici pour
                  sélectionner
                </p>
                <div className="flex flex-wrap">
                  {formik.values.documents.map((e) => e.name)}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
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
