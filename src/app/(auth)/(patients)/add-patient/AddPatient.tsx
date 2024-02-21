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
  Textarea,
} from "@nextui-org/react";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function AddPatient({
  doctors,
}: {
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
}) {
  const router = useRouter();
  const { currentColor } = useStateContext();
  const phoneRegExp = /^[0-9]{10}$/;
  const validationSchema = Yup.object({
    tel: Yup.string()
      .matches(phoneRegExp, "Numéro de téléphone non valide ")
      .required("Veuillez entrer un numéro de téléphone valide"),
    firstName: Yup.string().required("Veuillez remplir ce champ"),
    lastName: Yup.string().required("Veuillez remplir ce champ"),
    patientno: Yup.string().required("Veuillez remplir ce champ"),
    doctor: Yup.string().required("Veuillez remplir ce champ"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      patientno: "",
      birthDate: "",
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
      inclDate: "",
      tel: "",
      mail: "",
      social: null as never as SocialEnum,
      othersocial: "",
      education: null as never as EducationEnum,
      habitat: null as never as HabitatEnum,
      iscaregiver: false,
      caregiverfullName: "",
      caregivertel: "",
      diagnostic: null as never as DiagnosticEnum,
      diagnosticDate: "",
      prerequest: false,
      statusrequest: false,
      refDoc: false,
    },
    validationSchema: validationSchema,
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
            <Input
              isRequired
              onChange={formik.handleChange}
              name="lastName"
              value={formik.values.lastName}
              isInvalid={
                formik.touched.lastName && formik.errors.lastName ? true : false
              }
              disabled={formik.isSubmitting}
              type="text"
              label="Nom patient"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-xs italic">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="firstName"
            >
              Prénom <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              onChange={formik.handleChange}
              name="firstName"
              isInvalid={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }
              value={formik.values.firstName}
              disabled={formik.isSubmitting}
              type="text"
              label="Prénom Patient"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-xs italic">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="patientno"
          >
            Identifiant Patient ID<span className="text-red-500">*</span>
          </label>
          <Input
            isRequired
            onChange={formik.handleChange}
            name="patientno"
            value={formik.values.patientno}
            disabled={formik.isSubmitting}
            isInvalid={
              formik.touched.patientno && formik.errors.patientno ? true : false
            }
            type="text"
            label="Identifiant Patient"
          />
          {formik.touched.patientno && formik.errors.patientno ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.patientno}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="birthDate"
          >
            Date de naissance
          </label>
          <Input
            onChange={formik.handleChange}
            name="birthDate"
            value={formik.values.birthDate || ""}
            disabled={formik.isSubmitting}
            type="date"
            label="Date naissance"
          />
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="tel"
          >
            Numero de Telephone <span className="text-red-500">*</span>
          </label>
          <Input
            isRequired
            onChange={formik.handleChange}
            name="tel"
            value={formik.values.tel}
            disabled={formik.isSubmitting}
            isInvalid={formik.touched.tel && formik.errors.tel ? true : false}
            type="text"
            label="Téléphone patient"
            placeholder="0600110011"
          />
          {formik.touched.tel && formik.errors.tel ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.tel}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="address"
          >
            Adresse
          </label>
          <Input
            onChange={formik.handleChange}
            name="address"
            value={formik.values.address}
            disabled={formik.isSubmitting}
            type="text"
            label="Addresse"
          />
        </div>
        <div className=" mb-6 ">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="program"
          >
            Programme
          </label>

          <Select
            onChange={formik.handleChange}
            name="program"
            label="Programme"
            value={formik.values.program}
            disabled={formik.isSubmitting}
          >
            {Object.values(ProgramEnum).map((e) => (
              <SelectItem key={e}>{e}</SelectItem>
            ))}
          </Select>
        </div>

        <div className=" mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="notes"
          >
            Notes
          </label>
          <div className="relative">
            <Textarea
              onChange={formik.handleChange}
              name="notes"
              label="Notes"
              value={formik.values.notes}
              disabled={formik.isSubmitting}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="doctor"
          >
            Médecin <span className="text-red-500">*</span>
          </label>
          <Select
            isRequired
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
          {formik.touched.doctor && formik.errors.doctor ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.doctor}
            </div>
          ) : null}
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
                  <Checkbox
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
                  <Checkbox
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
            <Input
              onChange={formik.handleChange}
              name="inclDate"
              value={formik.values.inclDate}
              disabled={formik.isSubmitting}
              label="Date d'inclusion"
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
                formik.values.iscaregiver == false || formik.isSubmitting
              }
              className={` rounded-xl border border-[#396EA5] ${
                formik.values.iscaregiver == false || formik.isSubmitting
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
            Contact Téléphonique Care Giver
          </label>

          <Input
            type="text"
            pattern="^\+(?:[0-9] ?){6,25}[0-9]$"
            onChange={formik.handleChange}
            name="caregivertel"
            label="Numéro soignant(e)"
            value={formik.values.caregivertel}
            disabled={formik.isSubmitting}
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
                <Checkbox
                  name="diagnostic"
                  value={DiagnosticEnum.Biopsie}
                  isSelected={
                    formik.values.diagnostic == DiagnosticEnum.Biopsie
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "diagnostic",

                      !e.currentTarget.checked ? null : DiagnosticEnum.Biopsie
                    )
                  }
                >
                  {DiagnosticEnum.Biopsie}
                </Checkbox>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <Checkbox
                  name="diagnostic"
                  value={DiagnosticEnum.Scanner}
                  isSelected={
                    formik.values.diagnostic == DiagnosticEnum.Scanner
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "diagnostic",

                      !e.currentTarget.checked ? null : DiagnosticEnum.Scanner
                    )
                  }
                >
                  {DiagnosticEnum.Scanner}
                </Checkbox>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 px-3 items-center">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="diagnosticDate"
            >
              Date Diagnostique
            </label>
            <Input
              onChange={formik.handleChange}
              name="diagnosticDate"
              value={formik.values.diagnosticDate}
              disabled={formik.isSubmitting}
              type="date"
              placeholder="01/01/1920"
              label="Date diagnostique"
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

            <RadioGroup orientation="horizontal">
              <Radio
                value="true"
                name="prerequest"
                checked={formik.values.prerequest}
                onChange={(e) =>
                  formik.setFieldValue("prerequest", e.target.checked)
                }
              >
                Oui
              </Radio>
              <Radio
                value="false"
                name="prerequest"
                checked={!formik.values.prerequest}
                onChange={(e) => {
                  formik.setFieldValue("prerequest", !e.target.checked);
                  formik.setFieldValue("statusrequest", null);
                  formik.setFieldValue("refDoc", null);
                  formik.setFieldTouched("statusrequest");
                  formik.setFieldTouched("refDoc");
                }}
              >
                Non
              </Radio>
            </RadioGroup>
          </div>
          <div className=" md:w-1/2 items-center">
            <label
              className={`block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2 ${
                formik.values.prerequest == false || formik.isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              htmlFor="statusrequest"
            >
              Si Oui, état d'avancement de la demande
            </label>

            <RadioGroup
              orientation="horizontal"
              isDisabled={
                formik.values.prerequest == false || formik.isSubmitting
              }
              className={` ${
                formik.values.prerequest == false || formik.isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Radio
                value="true"
                name="statusrequest"
                checked={formik.values.statusrequest}
                onChange={(e) => formik.setFieldValue("statusrequest", true)}
              >
                Positive
              </Radio>
              <Radio
                value="false"
                name="statusrequest"
                checked={!formik.values.statusrequest}
                onChange={(e) => {
                  formik.setFieldValue("statusrequest", false);
                }}
              >
                Négative
              </Radio>
            </RadioGroup>
          </div>
          <div className=" md:w-1/2 items-center">
            <label
              className={`block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2 ${
                formik.values.prerequest == false || formik.isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              htmlFor="refDoc"
            >
              Si Oui, possession du documennt de refus
            </label>

            <RadioGroup
              orientation="horizontal"
              isDisabled={
                formik.values.prerequest && formik.values.statusrequest
                  ? false
                  : true || formik.isSubmitting
              }
              className={` ${
                (formik.values.prerequest == false &&
                  formik.values.statusrequest == false) ||
                formik.isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Radio
                value="true"
                name="refDoc"
                checked={formik.values.refDoc}
                onChange={(e) => formik.setFieldValue("refDoc", true)}
              >
                Oui
              </Radio>
              <Radio
                value="false"
                name="refDoc"
                checked={!formik.values.refDoc}
                onChange={(e) => {
                  formik.setFieldValue("refDoc", false);
                }}
              >
                Non
              </Radio>
            </RadioGroup>
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
