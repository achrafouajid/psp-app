"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { registerResponseEnum } from "../../../../../server/auth/types";
import addPatient from "../../../../../server/patient/add_patient";
import { ProgramEnum } from "@prisma/client";
import CriteriaCheckboxes, { Criteria } from "./CriteriaCheckboxes";

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
  const [inclusionCriteria, setInclusionCriteria] = useState<Criteria[]>([
    { label: "Patient over 18 years old", isChecked: false },
    {
      label:
        "Diagnosis confirmed of PULMONARY IDIOPATHIC FIBROSIS with proof (Scanner or Biopsy)",
      isChecked: false,
    },
    { label: "Patients with health insurance", isChecked: false },
    { label: "Consent form signed by Patient", isChecked: false },
  ]);

  const [exclusionCriteria, setExclusionCriteria] = useState<Criteria[]>([
    {
      label:
        "Incomplete medical file in terms of diagnosis, test results (to be defined)",
      isChecked: false,
    },
    { label: "Patients with outside Morocco", isChecked: false },
    { label: "Unreachable patient", isChecked: false },
  ]);

  const handleCheckboxChange = (index: number, criteriaType: string) => {
    if (criteriaType === "inclusion") {
      const updatedCriteria = [...inclusionCriteria];
      updatedCriteria[index].isChecked = !updatedCriteria[index].isChecked;
      setInclusionCriteria(updatedCriteria);
    } else {
      const updatedCriteria = [...exclusionCriteria];
      updatedCriteria[index].isChecked = !updatedCriteria[index].isChecked;
      setExclusionCriteria(updatedCriteria);
    }
  };
  return (
    <div className="">
      <div className="w-full mx-4">
        <form
          className="w-full border border-[#f17c34] rounded-lg p-8"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-[#396EA5] text-xl font-extrabold mb-3">
            1- Informations Patient
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
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
          <h1 className="text-[#396EA5] text-xl font-extrabold mb-3">
            2- Informations Supplémentaires
          </h1>
          <h1 className="text-[#396EA5] text-l font-bold">a- Inclusion</h1>
          <div className="container mx-auto mt-3">
            <div className="flex justify-between">
              <CriteriaCheckboxes
                criteriaType="inclusion"
                criteriaList={inclusionCriteria}
                handleCheckboxChange={handleCheckboxChange}
              />
              <CriteriaCheckboxes
                criteriaType="exclusion"
                criteriaList={exclusionCriteria}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
          <h1 className="text-[#396EA5] text-l font-bold">
            b- Renseignements Généraux
          </h1>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nom Médecin traitant<span className="text-red-500">*</span>
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
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Prénom Médecin traitant<span className="text-red-500">*</span>
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

            <div className=" flex flex-row  w-full justify-between">
              <div className=" md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Etablissement
                </label>
                <div className="flex flex-row">
                  <div className="flex items-center mb-2 gap-1 ml-2">
                    <input type="radio" className="mr-2" name="radio1" />
                    <label> Hôpital </label>
                  </div>
                  <div className="flex items-center mb-2 gap-1 ml-2">
                    <input type="radio" className="mr-2" name="radio1" />
                    <label> Clinique </label>
                  </div>
                  <div className="flex items-center mb-2 gap-1 ml-2">
                    <input type="radio" className="mr-2" name="radio1" />
                    <label> Cabinet </label>
                  </div>
                </div>
              </div>
              <div className=" md:w-1/2 px-3 items-center">
                <label
                  className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Service
                </label>
                <input
                  className=" bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  required
                  onChange={formik.handleChange}
                  name="service"
                  value={formik.values.firstName}
                  disabled={formik.isSubmitting}
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Date d'inclusion
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
                onChange={formik.handleChange}
                name="createdAt"
                value="{formik.values.createdAt}"
                type="date"
                placeholder="01/01/1920"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Contact Téléphonique
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="address"
              value={formik.values.address}
              disabled={formik.isSubmitting}
              id="grid-zip"
              type="number"
              placeholder="+212 60000000"
            />
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Contact Mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="mail"
              value={formik.values.address}
              id="grid-zip"
              type="mail"
              placeholder="example@example.com"
            />
          </div>
          <h1 className="text-[#396EA5] text-xl font-extrabold mb-3">
            3- Données Sociodémographiques
          </h1>
          <div className=" flex flex-row  w-full justify-between">
            <div className=" md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Couverture Sociale
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio2" />
                  <label> CNOPS </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio2" />
                  <label> CNSS </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio2" />
                  <label> FAR </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio2" />
                  <label> Assurance Privée </label>
                </div>
              </div>
            </div>
            <div className=" md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Autre
              </label>
              <input
                className=" bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
                onChange={formik.handleChange}
                name="service"
                value={formik.values.firstName}
                disabled={formik.isSubmitting}
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="mb-6 flex flex-row  w-full items-center px-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Niveau éducationnel
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio3" />
                <label> Analphabète </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio3" />
                <label> Primaire</label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio3" />
                <label> Collège</label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio3" />
                <label> Lycée </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio3" />
                <label> Universitaire </label>
              </div>
            </div>
          </div>
          <div className="mb-6 flex flex-row  w-full items-center px-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Lieu d'habitat
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio4" />
                <label> Urbain </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio4" />
                <label> Sub-Urbain</label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input type="radio" className="mr-2" name="radio4" />
                <label> Rural</label>
              </div>
            </div>
          </div>
          <div className="mb-6 flex flex-row  w-full items-center px-3">
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Care Giver (Soignant)
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio4" />
                  <label> Oui </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio4" />
                  <label> Non</label>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Si Oui
              </label>
              <input
                className=" bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
                onChange={formik.handleChange}
                name="service"
                value={formik.values.firstName}
                disabled={formik.isSubmitting}
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Contact Téléphonique Care Giver (Soignant(e))
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="address"
              value={formik.values.address}
              disabled={formik.isSubmitting}
              id="grid-zip"
              type="number"
              placeholder="+212 60000000"
            />
          </div>
          <div className="mb-6 flex flex-row  w-full items-center px-3">
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Confirmation de Diagnostique
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio5" />
                  <label> Scanner </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio5" />
                  <label> Biopsie</label>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Date
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
          <div className="mb-6 flex flex-row  w-full items-center px-3">
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Demande préalable effectuée
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio6" />
                  <label> Oui </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio6" />
                  <label> Non</label>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Si Oui , Etat d'avancement de la demande :
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio7" />
                  <label> Positive </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio7" />
                  <label> Négative</label>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Si Oui , Possession du document de refus
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio8" />
                  <label> Oui </label>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <input type="radio" className="mr-2" name="radio8" />
                  <label> Non</label>
                </div>
              </div>
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
