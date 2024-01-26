"use client";
import React from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { registerResponseEnum } from "../../../../../server/auth/types";
import { EstablishmentEnum } from "@prisma/client";
import addDoctor from "../../../../../server/doctor/add_doctor";

export default function AddDoctor() {
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "01/01/1950",
      address: "",
      program: ProgramEnum.PSP,
      notes: "",
      isMajor: false,
      isConfDiag: false,
      isSocial: false,
      isConsent: false,
      isIncomplete: false,
      isAbroad: false,
      isUnreachable: false,
      docfirstName: "",
      doclastName: "",
      establishment: EstablishmentEnum.Hopital as EstablishmentEnum,
      service: "",
      inclDate: "01/01/2024",
      tel: "",
      mail: "",
      social: SocialEnum.CNOPS as SocialEnum,
      othersocial: "",
      education: EducationEnum.Analphabete as EducationEnum,
      habitat: HabitatEnum.Urbain as HabitatEnum,
      iscaregiver: false,
      caregiverfullName: "",
      caregivertel: "",
      diagnostic: DiagnosticEnum.Scanner as DiagnosticEnum,
      diagnosticDate: "01/01/2024",
      prerequest: false,
      statusrequest: false,
      refDoc: false,
    },
    onSubmit: async (values) => {
      const res = await addDoctor(values);
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
          className="w-full border border-[#396EA5] rounded-lg p-8"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-[#396EA5] text-l font-bold">
            b- Renseignements Généraux
          </h1>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="doclastName"
              >
                Nom Médecin traitant<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                onChange={formik.handleChange}
                name="doclastName"
                value={formik.values.doclastName}
                disabled={formik.isSubmitting}
                type="text"
                placeholder="Nom médecin"
              />
              <p className="text-red-500 text-xs italic">
                * Veuillez remplir ces champs.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="docfirstName"
              >
                Prénom Médecin traitant<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={formik.handleChange}
                name="docfirstName"
                value={formik.values.docfirstName}
                disabled={formik.isSubmitting}
                type="text"
                placeholder="Prénom Médecin"
              />
            </div>

            <div className=" flex flex-row  w-full justify-between">
              <div className=" md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="establishment"
                >
                  Etablissement
                </label>
                <div className="flex flex-row">
                  <div className="flex items-center mb-2 gap-1 ml-2">
                    <input
                      type="radio"
                      className="mr-2"
                      name="establishment"
                      value="Hopital"
                      checked={
                        formik.values.establishment ===
                        EstablishmentEnum.Hopital
                      }
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="Hopital"> Hôpital </label>
                  </div>
                  <div className="flex items-center mb-2 gap-1 ml-2">
                    <input
                      type="radio"
                      className="mr-2"
                      name="establishment"
                      value="Clinique"
                      checked={
                        formik.values.establishment ==
                        EstablishmentEnum.Clinique
                      }
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="Clinique"> Clinique </label>
                  </div>
                  <div className="flex items-center mb-2 gap-1 ml-2">
                    <input
                      type="radio"
                      className="mr-2"
                      name="establishment"
                      value="Cabinet"
                      checked={
                        formik.values.establishment == EstablishmentEnum.Cabinet
                      }
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="Cabinet"> Cabinet </label>
                  </div>
                </div>
              </div>
              <div className=" md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="service"
                >
                  Service
                </label>
                <input
                  className=" bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={formik.handleChange}
                  name="service"
                  value={formik.values.service}
                  disabled={formik.isSubmitting}
                  type="text"
                  placeholder="Service"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6"></div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="tel"
            >
              Contact Téléphonique
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="tel"
              value={formik.values.tel}
              disabled={formik.isSubmitting}
              type="tel"
              placeholder="+212 60000000"
            />
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="mail"
            >
              Contact Mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="mail"
              value={formik.values.mail}
              disabled={formik.isSubmitting}
              type="mail"
              placeholder="example@example.com"
            />
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
