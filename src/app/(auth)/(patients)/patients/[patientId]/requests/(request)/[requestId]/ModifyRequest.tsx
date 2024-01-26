"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import updateRequest from "../../../../../../../../../server/patient/requests/updateRequest";
import Button from "@/components/Button";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Dropzone from "react-dropzone";
import { CiEdit } from "react-icons/ci";
import newRequestStatus from "../../../../../../../../../server/patient/requests/newRequestStatus";
import { RequestStatusEnum } from "@prisma/client";

export default function ModifyRequest({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getRequest>>>;
}) {
  const router = useRouter();
  const [loading, start] = useTransition();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const [isDisabled, setisDisabled] = useState(true);
  const [imgPrvs, setimgPrvs] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      ...data,
      createdAt: new Date(data.createdAt).toISOString().slice(0, 16),
      remark: "",
      documents: [] as File[],
    },
    onSubmit: async (values) => {
      if (isDisabled) return setisDisabled(false);
      const formdata = new FormData();
      formdata.append("id", data.id);
      formdata.append("patientId", data.patientId);
      formdata.append("createdAt", data.createdAt.toLocaleDateString() ?? "");
      formdata.append("remark", data.remark ?? "");
      values.documents.forEach((i) => formdata.append("documents", i));

      const res = await updateRequest(formdata);
      if (res == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.success("Le dossier a été mis à jour !");
      }
    },
  });
  useEffect(() => {
    setimgPrvs(formik.values.documents.map((i) => URL.createObjectURL(i)));

    return () => {
      imgPrvs.forEach((i) => URL.revokeObjectURL(i));
    };
  }, [formik.values.documents]);

  const currentStatus = data.statuses.find((e) => e.current);

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl text-[#396EA5]">
        Dossier de {data.Patient.lastName} {data.Patient.firstName}
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid max-w-2xl mx-auto">
          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div className="w-full mb-2 sm:mb-6 flex flex-row justify-between">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
              >
                Etat du Dossier :
              </label>

              <p> {currentStatus?.current}</p>
              <Button
                type="submit"
                color="white"
                bgColor={currentColor}
                text={isDisabled ? "Modifier" : "Sauvegarder"}
                borderRadius="10px"
                icon={<CiEdit />}
                disabled={formik.isSubmitting}
              />
            </div>
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Prénom Patient
                </label>
                <input
                  readOnly={isDisabled}
                  type="text"
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Your first name"
                  onChange={formik.handleChange}
                  name="firstName"
                  value={formik.values.Patient.firstName}
                  disabled={formik.isSubmitting}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Nom Patient
                </label>
                <input
                  readOnly={isDisabled}
                  type="text"
                  defaultValue={data.Patient.lastName}
                  id="last_name"
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Your last name"
                  onChange={formik.handleChange}
                  name="lastName"
                  value={formik.values.Patient.lastName}
                  disabled={formik.isSubmitting}
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <div className="flex flex-row mb-2 sm:mb-6">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Création Dossier
                </label>
                <input
                  readOnly={isDisabled}
                  type="datetime-local"
                  id="profession"
                  defaultValue=""
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  name="createdAt"
                  value={formik.values.createdAt}
                  disabled={formik.isSubmitting}
                />
              </div>
              <div className="w-full mb-2 sm:mb-6">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Remarque :
                </label>
                <input
                  readOnly={isDisabled}
                  type="text"
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Remarque"
                  onChange={formik.handleChange}
                  name="firstName"
                  value={formik.values.remark}
                  disabled={formik.isSubmitting}
                />
              </div>
              <div className="flex flex-row mb-2 sm:mb-6">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Constitution Dossier
                </label>
                <input
                  readOnly={isDisabled}
                  type="date"
                  id="profession"
                  defaultValue=""
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  name="birthDate"
                  value={formik.values.createdAt}
                  disabled={formik.isSubmitting}
                />
              </div>
              <div className="w-full mb-2 sm:mb-6">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Remarque :
                </label>
                <input
                  readOnly={isDisabled}
                  type="text"
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Remarque"
                  onChange={formik.handleChange}
                  name="firstName"
                  value={formik.values.remark}
                  disabled={formik.isSubmitting}
                />
              </div>
              <div className="flex flex-row mb-2 sm:mb-6">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Completion Dossier
                </label>
                <input
                  readOnly={isDisabled}
                  type="date"
                  id="profession"
                  defaultValue=""
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  onChange={formik.handleChange}
                  name="birthDate"
                  value={formik.values.createdAt}
                  disabled={formik.isSubmitting}
                />
              </div>
              <div className="w-full mb-2 sm:mb-6">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                >
                  Remarque :
                </label>
                <input
                  readOnly={isDisabled}
                  type="text"
                  className="bg-indigo-50 border border-indigo-300 text-[#396EA5] text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Remarque"
                  onChange={formik.handleChange}
                  name="firstName"
                  value={formik.values.remark}
                  disabled={formik.isSubmitting}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
              >
                Tous les Documents Fournis:
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
                      className="border border-dashed border-[#396EA5] relative cursor-pointer w-full h-full p-20 z-50"
                    >
                      <input {...getInputProps()} />

                      <p className="text-[#396EA5] text-center font-bold">
                        Glissez les documents supplémentaires à fournir ou
                        Cliquez ici pour sélectionner
                      </p>
                      <div className="flex flex-wrap">
                        {formik.values.documents.map((e) => e.name)}
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>

          <div className="flex mb-5 justify-between items-center">
            {" "}
            <Button
              color="white"
              onClick={() =>
                start(() =>
                  newRequestStatus(data.id, RequestStatusEnum.Accepte)
                )
              }
              bgColor="red"
              text="Refuser Dossier"
              borderRadius="10px"
              disabled={loading}
              icon={<FaXmark />}
            />
            <Button
              type="submit"
              color="white"
              bgColor={currentColor}
              borderRadius="10px"
              text="Accepter Dossier"
              disabled={loading}
              icon={<FaCheck />}
              onClick={() =>
                start(() =>
                  newRequestStatus(data.id, RequestStatusEnum.Accepte)
                )
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}
