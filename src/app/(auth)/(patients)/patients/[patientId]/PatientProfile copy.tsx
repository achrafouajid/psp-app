"use client";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import updatePatient from "../../../../../../server/patient/update_patient";
import toast from "react-hot-toast";
import {
  DiagnosticEnum,
  EducationEnum,
  HabitatEnum,
  ProgramEnum,
  SocialEnum,
  UserRole,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { usePatient } from "@/Contexts/PatientContext";
import Header from "@/components/Header";
import {
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import getAllDoctors from "../../../../../../server/doctor/getAllDoctors";
import Link from "next/link";
import deletePatient from "../../../../../../server/patient/delete_patient";
import { useSession } from "@/Contexts/UserContext";
import { FiEdit, FiFile, FiSave } from "react-icons/fi";

const PatientProfileCopy = ({
  doctors,
}: {
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
}) => {
  const data = usePatient();
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const [isDisabled, setisDisabled] = useState(true);
  const user = useSession();

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

  const formik = useFormik({
    initialValues: {
      ...data,
      image: null as never as File,
      birthDate: data.birthDate?.toISOString().slice(0, 10),
      inclDate: data.inclDate?.toISOString().slice(0, 10),
      doctor: data.doctor,
      diagnosticDate: data.diagnosticDate?.toISOString().slice(0, 10),
      tel: data.tel,
      patientno: data.patientno,
    },
    onSubmit: async (values) => {
      if (isDisabled) return setisDisabled(false);
      const formadata = new FormData();
      formadata.append("firstName", values.firstName);
      formadata.append("lastName", values.lastName);
      formadata.append("birthDate", values.birthDate?.toString() ?? "");
      formadata.append("tel", values.tel ?? "");
      formadata.append("patientno", values.patientno ?? "");
      formadata.append("address", values.address ?? "");
      formadata.append("program", values.program ?? "");
      formadata.append("notes", values.notes ?? "");
      formadata.append(
        "doctor",
        values.doctor?.title +
          " " +
          values.doctor?.firstName +
          " " +
          values.doctor?.lastName
      );
      formadata.append("isMajor", values.isMajor ? "on" : "off");
      formadata.append("isConfDiag", values.isConfDiag ? "on" : "off");
      formadata.append("isSocial", values.isSocial ? "on" : "off");
      formadata.append("isConsent", values.isConsent ? "on" : "off");
      formadata.append("isIncomplete", values.isIncomplete ? "on" : "off");
      formadata.append("isAbroad", values.isAbroad ? "on" : "off");
      formadata.append("isUnreachable", values.isUnreachable ? "on" : "off");
      formadata.append("inclDate", values.inclDate?.toString() ?? "");
      formadata.append("tel", values.tel ?? "");
      formadata.append("mail", values.mail ?? "");
      formadata.append("social", values.social ?? "");
      formadata.append("othersocial", values.othersocial ?? "");
      formadata.append("education", values.education ?? "");
      formadata.append("habitat", values.habitat ?? "");
      formadata.append("iscaregiver", values.iscaregiver ? "on" : "off");
      formadata.append("caregiverfullName", values.caregiver?.fullName ?? "");
      formadata.append("caregiverfullName", values.caregiver?.tel ?? "");
      formadata.append("diagnostic", values.diagnostic ?? "");
      formadata.append(
        "diagnosticDate",
        values.diagnosticDate?.toString() ?? ""
      );
      formadata.append("prerequest", values.prerequest ? "on" : "off");
      formadata.append("statusrequest", values.statusRequest ? "on" : "off");
      formadata.append("refDoc", values.refDoc ? "on" : "off");
      values.image && formadata.append("image", values.image);

      const res = await updatePatient(formadata);
      if (res == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.success("Informations mises à jour !");
      }
    },
  });
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="Patients"
        title={`Information patient : ${data.lastName + " " + data.firstName}`}
      />

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
                Nom
              </label>
              <Input
                isReadOnly={isDisabled}
                isRequired={true}
                onChange={formik.handleChange}
                name="lastName"
                value={formik.values.lastName}
                disabled={formik.isSubmitting}
                type="text"
                label="Nom patient"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="firstName"
              >
                Prénom
              </label>
              <Input
                isReadOnly={isDisabled}
                isRequired={true}
                onChange={formik.handleChange}
                name="firstName"
                value={formik.values.firstName}
                disabled={formik.isSubmitting}
                type="text"
                label="Prénom Patient"
              />
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
              isReadOnly={isDisabled}
              onChange={formik.handleChange}
              name="patientno"
              value={formik.values.patientno ?? ""}
              disabled={formik.isSubmitting}
              isInvalid={
                formik.touched.patientno && formik.errors.patientno
                  ? true
                  : false
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
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="birthDate"
              >
                Date de naissance
              </label>
              <Input
                isReadOnly={isDisabled}
                isRequired={true}
                onChange={formik.handleChange}
                name="birthDate"
                value={formik.values.birthDate}
                disabled={formik.isSubmitting}
                type="date"
                label="Date naissance"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="tel"
            >
              Numero de Telephone <span className="text-red-500">*</span>
            </label>
            <Input
              isReadOnly={isDisabled}
              onChange={formik.handleChange}
              name="tel"
              value={formik.values.tel ?? ""}
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
              isReadOnly={isDisabled}
              onChange={formik.handleChange}
              name="address"
              value={formik.values.address ?? ""}
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
            <div className="relative">
              <Select
                isDisabled={isDisabled}
                onChange={formik.handleChange}
                name="program"
                value={formik.values.program ?? ProgramEnum.PSP}
                disabled={formik.isSubmitting}
                selectedKeys={[formik.values.program ?? ProgramEnum.PSP]}
              >
                {Object.values(ProgramEnum).map((e) => (
                  <SelectItem isReadOnly={isDisabled} key={e}>
                    {e}
                  </SelectItem>
                ))}
              </Select>
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
              <Textarea
                isReadOnly={isDisabled}
                onChange={formik.handleChange}
                name="notes"
                label="Notes"
                value={formik.values.notes ?? ""}
                disabled={formik.isSubmitting}
              />
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
              isDisabled={isDisabled || formik.isSubmitting}
              name="doctor"
              value={formik.values.doctor?.id}
              onChange={(e) => {
                // Directly find and set the selected doctor object in the formik state
                const selectedDoctor = doctors.find(
                  (doctor) => doctor.id === e.target.value
                );
                formik.setFieldValue("doctor", selectedDoctor);
              }}
              selectedKeys={[formik.values.doctor?.id ?? ""]}
              items={doctors}
              label="Médecin"
              placeholder="Choisissez un médecin"
            >
              {(doctor) => (
                <SelectItem
                  isReadOnly={isDisabled}
                  value={doctor.id}
                  key={doctor.id}
                >
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
                    <Checkbox
                      isReadOnly={isDisabled}
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
                      isReadOnly={isDisabled}
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
                isReadOnly={isDisabled}
                onChange={formik.handleChange}
                name="inclDate"
                value={formik.values.inclDate ?? ""}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
                    onChange={formik.handleChange}
                    name="othersocial"
                    type="text"
                    value={formik.values.othersocial ?? ""}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
                    name="education"
                    value={EducationEnum.Primaire}
                    isSelected={
                      formik.values.education == EducationEnum.Primaire
                    }
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
                    isReadOnly={isDisabled}
                    name="education"
                    value={EducationEnum.College}
                    isSelected={
                      formik.values.education == EducationEnum.College
                    }
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
              <RadioGroup
                isReadOnly={isDisabled}
                label="Soignant(e)"
                orientation="horizontal"
              >
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
                isReadOnly={isDisabled}
                onChange={formik.handleChange}
                name="caregiverfullName"
                value={formik.values.caregiver?.fullName ?? ""}
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
              isReadOnly={isDisabled}
              type="text"
              pattern="^\+(?:[0-9] ?){6,25}[0-9]$"
              onChange={formik.handleChange}
              name="caregivertel"
              label="Numéro soignant(e)"
              value={formik.values.caregiver?.tel ?? ""}
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
                    isReadOnly={isDisabled}
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
                    isReadOnly={isDisabled}
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
                isReadOnly={isDisabled}
                onChange={formik.handleChange}
                name="diagnosticDate"
                value={formik.values.diagnosticDate ?? ""}
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

              <RadioGroup isReadOnly={isDisabled} orientation="horizontal">
                <Radio
                  value="true"
                  name="prerequest"
                  checked={formik.values.prerequest ?? false}
                  onChange={(e) =>
                    formik.setFieldValue("prerequest", e.target.checked)
                  }
                >
                  Oui
                </Radio>
                <Radio
                  value="false"
                  name="prerequest"
                  checked={!formik.values.prerequest ?? false}
                  onChange={(e) => {
                    formik.setFieldValue("prerequest", !e.target.checked);
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
                isReadOnly={isDisabled}
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
                  checked={formik.values.statusRequest ?? false}
                  onChange={(e) =>
                    formik.setFieldValue("statusrequest", e.target.checked)
                  }
                >
                  Positive
                </Radio>
                <Radio
                  value="false"
                  name="statusrequest"
                  checked={!formik.values.statusRequest ?? false}
                  onChange={(e) => {
                    formik.setFieldValue("statusrequest", !e.target.checked);
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
                isReadOnly={isDisabled}
                orientation="horizontal"
                isDisabled={
                  (formik.values.prerequest && !formik.values.statusRequest) ||
                  formik.isSubmitting
                    ? true
                    : false
                }
                className={` ${
                  (formik.values.prerequest == false &&
                    formik.values.statusRequest == false) ||
                  formik.isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Radio
                  value="true"
                  name="refDoc"
                  checked={formik.values.refDoc ?? false}
                  onChange={(e) =>
                    formik.setFieldValue("refDoc", e.target.checked)
                  }
                >
                  Oui
                </Radio>
                <Radio
                  value="false"
                  name="refDoc"
                  checked={!formik.values.refDoc ?? false}
                  onChange={(e) => {
                    formik.setFieldValue("refDoc", !e.target.checked);
                  }}
                >
                  Non
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <div className="flex mb-5 justify-between items-center">
            <Link
              href={`./${data.id}/requests`}
              className="text-[#396EA5] flex items -center"
            >
              <FiFile size={25} /> Accéder aux demandes
            </Link>
            {user.role == UserRole.Admin && (
              <>
                <Button
                  color="white"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Voulez-vous vraiment supprimer ce patient ? Toutes ses demandes seront supprimées..."
                      )
                    ) {
                      deletePatient(data.id);
                    }
                  }}
                  bgColor="red"
                  text="Supprimer "
                  borderRadius="10px"
                  disabled={formik.isSubmitting}
                />
              </>
            )}
            <Button
              type="submit"
              color="white"
              bgColor={currentColor}
              text={isDisabled ? "Modifier" : "Sauvegarder"}
              icon={isDisabled ? <FiEdit /> : <FiSave />}
              borderRadius="10px"
              disabled={formik.isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileCopy;
