"use client";
import React from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { registerResponseEnum } from "../../../../../server/auth/types";
import {
  EstablishmentEnum,
  PriorityEnum,
  SecteurEnum,
  TitleEnum,
} from "@prisma/client";
import addDoctor from "../../../../../server/doctor/add_doctor";

export default function AddDoctor() {
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      title: TitleEnum.Dr as TitleEnum,
      firstName: "",
      lastName: "",
      establishment: EstablishmentEnum.Hopital as EstablishmentEnum,
      service: "",
      inclDate: "01/01/2024",
      tel: "",
      mail: "",
      secteur: SecteurEnum.Prive as SecteurEnum,
      region: "",
      city: "",
      priority: PriorityEnum.HVT as PriorityEnum,
    },
    onSubmit: async (values) => {
      {
        /*   const res = await addDoctor(values);
      if (res.status == registerResponseEnum.exist)
        toast.error("Ce patient existe déjà  !");
      else {
        toast.success("Dossier patient créé avec succès !");
        formik.resetForm();
      }*/
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
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="title"
              >
                Titre
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={formik.handleChange}
                  name="title"
                  value={formik.values.title}
                  disabled={formik.isSubmitting}
                >
                  {Object.values(TitleEnum).map((e) => (
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
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                value={formik.values.lastName}
                disabled={formik.isSubmitting}
                type="text"
                placeholder="Nom médecin"
              />
              <p className="text-red-500 text-xs italic">
                * Veuillez remplir ces champs.
              </p>
            </div>
            <div className="w-full md:w-1/3 px-3">
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
                value={formik.values.firstName}
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
            <div className=" flex flex-row  w-full justify-between">
              <div className=" md:w-1/3 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="region"
                >
                  Région
                </label>
                <input
                  className=" bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={formik.handleChange}
                  name="region"
                  value={formik.values.service}
                  disabled={formik.isSubmitting}
                  type="text"
                  placeholder="Région"
                />
              </div>
              <div className="md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  Ville
                </label>
                <input
                  className=" bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={formik.handleChange}
                  name="city"
                  value={formik.values.service}
                  disabled={formik.isSubmitting}
                  type="text"
                  placeholder="Ville"
                />
              </div>

              <div className=" md:w-1/3 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="attache"
                >
                  Attaché Hospitalier
                </label>
                <input
                  className=" bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={formik.handleChange}
                  name="attache"
                  value={formik.values.service}
                  disabled={formik.isSubmitting}
                  type="text"
                  placeholder="Région 1"
                />
              </div>
            </div>
            <div className="flex flex-row  w-full justify-between">
              <div className="md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="secteur"
                >
                  Secteur
                </label>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input
                    type="radio"
                    className="mr-2"
                    name="secteur"
                    value="Prive"
                    checked={formik.values.secteur === SecteurEnum.Prive}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="Prive"> Prive </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input
                    type="radio"
                    className="mr-2"
                    name="secteur"
                    value="Public"
                    checked={formik.values.secteur == SecteurEnum.Public}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="Public"> Public </label>
                </div>
              </div>
              <div className="md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="secteur"
                >
                  Priorité
                </label>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input
                    type="radio"
                    className="mr-2"
                    name="secteur"
                    value="Prive"
                    checked={formik.values.secteur === SecteurEnum.Prive}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="Prive"> HVT </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input
                    type="radio"
                    className="mr-2"
                    name="secteur"
                    value="Public"
                    checked={formik.values.secteur == SecteurEnum.Public}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="Public"> LVT </label>
                </div>
              </div>
              <div className="flex flex-row"></div>
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
