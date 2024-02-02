"use client";
import React from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { registerResponseEnum } from "../../../../../server/auth/types";
import addPatient from "../../../../../server/patient/add_patient";
import {
  DiagnosticEnum,
  EducationEnum,
  HabitatEnum,
  ProgramEnum,
  SocialEnum,
} from "@prisma/client";
import {
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import { useRouter } from "next/navigation";

export default function AddPatient({
  doctors,
}: {
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
}) {
  const router = useRouter();
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "01/01/1950",
      address: "",
      program: ProgramEnum.PSP,
      notes: "",
      doctor: "",
      isMajor: false,
      isConfDiag: false,
      isSocial: false,
      isConsent: false,
      isIncomplete: false,
      isAbroad: false,
      isUnreachable: false,
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
      const res = await addPatient(values);
      if (res.status == registerResponseEnum.exist)
        toast.error("Ce patient existe déjà  !");
      else {
        toast.success("Dossier patient créé avec succès !");
        router.push("/patients");
        formik.resetForm();
      }
    },
  });
  const inclusionCriteria = [
    { label: "Patient over 18 years old", name: "isMajor" },
    {
      label:
        "Diagnosis confirmed of PULMONARY IDIOPATHIC FIBROSIS with proof (Scanner or Biopsy)",
      name: "isConfDiag",
    },
    { label: "Patients with health insurance", name: "isSocial" },
    { label: "Consent form signed by Patient", name: "isConsent" },
  ];

  const exclusionCriteria = [
    {
      label:
        "Incomplete medical file in terms of diagnosis, test results (to be defined)",
      name: "isIncomplete",
    },
    { label: "Patients with outside Morocco", name: "isAbroad" },
    { label: "Unreachable patient", name: "isUnreachable" },
  ];

  return (
    <div className="w-full mx-4">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="text-[#396EA5] text-xl font-extrabold mb-3">
          1- Informations Patient
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="lastName"
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
              type="text"
              placeholder="Nom patient"
            />
            <p className="text-red-500 text-xs italic">
              * Veuillez remplir ces champs.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="firstName"
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
              type="text"
              placeholder="Prénom Patient"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="birthDate"
            >
              Date de naissance <span className="text-red-500">*</span>
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
            htmlFor="address"
          >
            Adresse
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={formik.handleChange}
            name="address"
            value={formik.values.address}
            disabled={formik.isSubmitting}
            type="text"
            placeholder="123 Rue A 20220"
          />
        </div>
        <div className=" mb-6 ">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="program"
          >
            Programme
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            htmlFor="notes"
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
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="doctor"
          >
            Médecin
          </label>
          <Select
            name="doctor"
            value={formik.values.doctor}
            selectedKeys={[formik.values.doctor]}
            onChange={formik.handleChange}
            items={doctors}
            label="Médecin"
            placeholder="Choisissez un médecin"
          >
            {(doctor) => (
              <SelectItem value={doctor.id} key={doctor.id}>
                {doctor.lastName.concat(" ", doctor.firstName)}
              </SelectItem>
            )}
          </Select>
        </div>
        <h1 className="text-[#396EA5] text-xl font-extrabold mb-3">
          2- Informations Supplémentaires
        </h1>
        <h1 className="text-[#396EA5] text-l font-bold">a- Inclusion</h1>
        <div className="container mx-auto mt-3">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-bold mb-2 text-[#396EA5]">
                Inclusion Criteria
              </p>
              {inclusionCriteria.map((criteria) => (
                <div key={criteria.name} className="mb-2">
                  <input
                    type="checkbox"
                    id={criteria.name}
                    name={criteria.name}
                    onChange={formik.handleChange}
                    /* @ts-ignore */
                    value={formik.values[criteria.name]}
                    disabled={formik.isSubmitting}
                    className="mr-2"
                  />
                  <label htmlFor={criteria.name}>{criteria.label}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="font-bold mb-2 text-[#396EA5]">
                Exclusion Criteria
              </p>
              {exclusionCriteria.map((criteria) => (
                <div key={criteria.name} className="mb-2">
                  <input
                    type="checkbox"
                    id={criteria.name}
                    name={criteria.name}
                    onChange={formik.handleChange}
                    /* @ts-ignore */
                    value={formik.values[criteria.name]}
                    disabled={formik.isSubmitting}
                    className="mr-2"
                  />
                  <label htmlFor={criteria.name}>{criteria.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mb-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="inclDate"
            >
              Date d'inclusion
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="inclDate"
              value={formik.values.inclDate}
              disabled={formik.isSubmitting}
              type="date"
              placeholder="01/01/1920"
            />
          </div>
        </div>
        <h1 className="text-[#396EA5] text-xl font-extrabold mb-3">
          3- Données Sociodémographiques
        </h1>
        <div className=" flex flex-row  w-full justify-between">
          <div className=" md:w-1/2 px-3 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="social"
            >
              Couverture Sociale
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="social"
                  value={SocialEnum.CNOPS}
                  isSelected={formik.values.social == SocialEnum.CNOPS}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "social",

                      !e.currentTarget.checked ? null : SocialEnum.CNOPS
                    )
                  }
                >
                  {SocialEnum.CNOPS}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="social"
                  value={SocialEnum.CNSS}
                  isSelected={formik.values.social == SocialEnum.CNSS}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "social",
                      !e.currentTarget.checked ? null : SocialEnum.CNSS
                    )
                  }
                >
                  {SocialEnum.CNSS}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="social"
                  value={SocialEnum.FAR}
                  isSelected={formik.values.social == SocialEnum.FAR}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "social",
                      !e.currentTarget.checked ? null : SocialEnum.FAR
                    )
                  }
                >
                  {SocialEnum.FAR}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="social"
                  value={SocialEnum.Prive}
                  isSelected={formik.values.social == SocialEnum.Prive}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "social",
                      !e.currentTarget.checked ? null : SocialEnum.Prive
                    )
                  }
                >
                  Assurance {SocialEnum.Prive}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="social"
                  value={SocialEnum.Other}
                  isSelected={formik.values.social == SocialEnum.Other}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "social",
                      e.target.checked ? SocialEnum.Other : null
                    );
                  }}
                >
                  Autre
                </Checkbox>
                <Input
                  onChange={formik.handleChange}
                  name="othersocial"
                  type="text"
                  value={formik.values.othersocial}
                  placeholder="Préciser ..."
                  disabled={
                    formik.values.social !== SocialEnum.Other ||
                    formik.isSubmitting
                  }
                  className={` rounded-xl border border-[#396EA5] ${
                    formik.values.social !== SocialEnum.Other ||
                    formik.isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-row  w-full items-center px-3">
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="education"
            >
              Niveau Educationnel
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="education"
                  value={EducationEnum.Analphabete}
                  isSelected={
                    formik.values.education == EducationEnum.Analphabete
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "education",

                      !e.currentTarget.checked
                        ? null
                        : EducationEnum.Analphabete
                    )
                  }
                >
                  {EducationEnum.Analphabete}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="education"
                  value={EducationEnum.Primaire}
                  isSelected={formik.values.education == EducationEnum.Primaire}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "education",

                      !e.currentTarget.checked ? null : EducationEnum.Primaire
                    )
                  }
                >
                  {EducationEnum.Primaire}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="education"
                  value={EducationEnum.College}
                  isSelected={formik.values.education == EducationEnum.College}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "education",

                      !e.currentTarget.checked ? null : EducationEnum.College
                    )
                  }
                >
                  {EducationEnum.College}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="education"
                  value={EducationEnum.Lycee}
                  isSelected={formik.values.education == EducationEnum.Lycee}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "education",

                      !e.currentTarget.checked ? null : EducationEnum.Lycee
                    )
                  }
                >
                  {EducationEnum.Lycee}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="education"
                  value={EducationEnum.Universitaire}
                  isSelected={
                    formik.values.education == EducationEnum.Universitaire
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "education",

                      !e.currentTarget.checked
                        ? null
                        : EducationEnum.Universitaire
                    )
                  }
                >
                  {EducationEnum.Universitaire}
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-row  w-full items-center px-3">
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="habitat"
            >
              Lieu d'Habitat
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="habitat"
                  value={HabitatEnum.Urbain}
                  isSelected={formik.values.habitat == HabitatEnum.Urbain}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "habitat",

                      !e.currentTarget.checked ? null : HabitatEnum.Urbain
                    )
                  }
                >
                  {HabitatEnum.Urbain}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="habitat"
                  value={HabitatEnum.SubUrbain}
                  isSelected={formik.values.habitat == HabitatEnum.SubUrbain}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "habitat",

                      !e.currentTarget.checked ? null : HabitatEnum.SubUrbain
                    )
                  }
                >
                  {HabitatEnum.SubUrbain}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="habitat"
                  value={HabitatEnum.Rural}
                  isSelected={formik.values.habitat == HabitatEnum.Rural}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "habitat",

                      !e.currentTarget.checked ? null : HabitatEnum.Rural
                    )
                  }
                >
                  {HabitatEnum.Rural}
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-row  w-full items-center px-3">
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="iscaregiver"
            >
              Care Giver
            </label>
            <RadioGroup label="Soignant(e)" orientation="horizontal">
              <Radio
                value="true"
                name="iscaregiver"
                checked={formik.values.iscaregiver}
                onChange={(e) =>
                  formik.setFieldValue("iscaregiver", e.target.checked)
                }
              >
                Oui
              </Radio>
              <Radio
                value="false"
                name="iscaregiver"
                checked={!formik.values.iscaregiver}
                onChange={(e) => {
                  formik.setFieldValue("iscaregiver", !e.target.checked);
                }}
              >
                Non
              </Radio>
            </RadioGroup>
          </div>
          <div className="md:w-1/2 px-3 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="caregiverfullName"
            >
              Si Oui
            </label>
            <Input
              onChange={formik.handleChange}
              name="caregiverfullName"
              value={formik.values.caregiverfullName}
              type="text"
              placeholder="Préciser Nom Prénom Soignant(e)"
              disabled={
                formik.values.iscaregiver !== false || formik.isSubmitting
              }
              className={` rounded-xl border border-[#396EA5] ${
                formik.values.social !== SocialEnum.Other || formik.isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="caregivertel"
          >
            Contact Téléphonique Care Giver (Soignant(e))
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={formik.handleChange}
            name="caregivertel"
            value={formik.values.caregivertel}
            disabled={formik.isSubmitting}
            type="tel"
            placeholder="+212 60000000"
          />
        </div>
        <div className="mb-6 flex flex-row  w-full items-center px-3">
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="diagnostic"
            >
              Confirmation de diagnostique
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="diagnostic"
                  value={DiagnosticEnum.Biopsie}
                  checked={formik.values.diagnostic === DiagnosticEnum.Biopsie}
                  onChange={formik.handleChange}
                />
                <label htmlFor="Biopsie"> Biopsie </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="diagnostic"
                  value={DiagnosticEnum.Scanner}
                  checked={formik.values.diagnostic == DiagnosticEnum.Scanner}
                  onChange={formik.handleChange}
                />
                <label htmlFor="Scanner"> Scanner</label>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 px-3 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="diagnosticDate"
            >
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={formik.handleChange}
              name="diagnosticDate"
              value={formik.values.diagnosticDate}
              disabled={formik.isSubmitting}
              type="date"
              placeholder="01/01/1920"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-row  w-full items-center px-3">
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="prerequest"
            >
              Demande Préalable effectuée
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="prerequest"
                  checked={formik.values.prerequest}
                  onChange={(e) =>
                    formik.setFieldValue("prerequest", e.target.checked)
                  }
                />
                <label htmlFor="prerequest"> Oui </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="prerequest"
                  checked={!formik.values.prerequest}
                  onChange={(e) => {
                    formik.setFieldValue("prerequest", !e.target.checked);
                  }}
                />
                <label htmlFor="prerequest"> Non </label>
              </div>
            </div>
          </div>
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="statusrequest"
            >
              Si Oui, état d'avancement de la demande
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="statusrequest"
                  checked={formik.values.statusrequest}
                  onChange={(e) =>
                    formik.setFieldValue("statusrequest", e.target.checked)
                  }
                />
                <label htmlFor="statusrequest"> Positive </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="statusrequest"
                  checked={!formik.values.statusrequest}
                  onChange={(e) => {
                    formik.setFieldValue("statusrequest", !e.target.checked);
                  }}
                />
                <label htmlFor="statusrequest"> Négative </label>
              </div>
            </div>
          </div>
          <div className=" md:w-1/2 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="refDoc"
            >
              Si Oui, possession du documennt de refus
            </label>
            <div className="flex flex-row">
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="refDoc"
                  checked={formik.values.refDoc}
                  onChange={(e) =>
                    formik.setFieldValue("refDoc", e.target.checked)
                  }
                />
                <label htmlFor="refDoc"> Oui </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="refDoc"
                  checked={!formik.values.refDoc}
                  onChange={(e) => {
                    formik.setFieldValue("refDoc", !e.target.checked);
                  }}
                />
                <label htmlFor="refDoc"> Non </label>
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
  );
}
