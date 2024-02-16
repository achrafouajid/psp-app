"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Input, Select, SelectItem } from "@nextui-org/react";
import {
  EstablishmentEnum,
  PriorityEnum,
  SecteurEnum,
  TitleEnum,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import getAllRegions from "../../../../../../server/region/getAllRegions";
import { registerResponseEnum } from "../../../../../../server/auth/types";
import getDoctor from "../../../../../../server/doctor/get_doctor";
import deleteDoctor from "../../../../../../server/doctor/delete_doctor";

export default function DoctorProfile({
  regions,
  data,
}: {
  regions: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>;
  data: any;
}) {
  const { currentColor } = useStateContext();
  const ref = useRef<HTMLInputElement>(null);
  const [isDisabled, setisDisabled] = useState(true);
  const [region, setRegion] = useState(regions.at(0)?.id as string);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: TitleEnum.Dr as TitleEnum,
      firstName: "",
      lastName: "",
      establishment: EstablishmentEnum.Hopital as EstablishmentEnum,
      service: "",
      tel: "",
      mail: "",
      secteur: SecteurEnum.Prive as SecteurEnum,
      region: "",
      city: "",
      priority: PriorityEnum.HVT as PriorityEnum,
      attache: "",
    },
    onSubmit: async (values) => {
      if (isDisabled) return setisDisabled(false);
      const formadata = new FormData();
      formadata.append("title", values.title);
      formadata.append("firstName", values.firstName);
      formadata.append("lastName", values.lastName);
      formadata.append("establishment", values.establishment ?? "");
      formadata.append("service", values.service ?? "");
      formadata.append("tel", values.tel ?? "");
      formadata.append("mail", values.mail ?? "");
      formadata.append("secteur", values.secteur ?? "");
      formadata.append("region", values.region ?? "");
      formadata.append("city", values.city ?? "");
      formadata.append("priority", values.priority ?? "");
      formadata.append("attache", values.attache ?? "");
      {
        /*    const res = await updateDoctor(formadata);
      if (res.status == registerResponseEnum.exist)
        toast.error("Ce médecin existe déjà  !");
      else {
        toast.success("Médecin ajouté avec succès !");
        router.push("/doctors");
      } */
      }
    },
  });
  useEffect(() => {
    formik.setFieldValue(
      "city",
      regions.find((r) => r.id == region)?.city.at(0)?.id
    );
  }, [region]);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl border border-[#396EA5]">
      <Header
        category="Médecins"
        title={`Information médecin : ${
          data.title + ". " + data.lastName + " " + data.firstName
        }`}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="title"
            >
              Titre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Select
                label="Titre"
                isRequired={true}
                onChange={formik.handleChange}
                name="title"
                value={formik.values.title}
                disabled={formik.isSubmitting}
              >
                {Object.values(TitleEnum).map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <p className="text-red-500 text-xs italic">
              * Champs obligatoires.
            </p>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="lastName"
            >
              Nom Médecin traitant <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired={true}
              label="Nom Médecin"
              onChange={formik.handleChange}
              name="lastName"
              value={formik.values.lastName}
              disabled={formik.isSubmitting}
              type="text"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="firstName"
            >
              Prénom Médecin traitant <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired={true}
              onChange={formik.handleChange}
              name="firstName"
              label="Prénom Médecin"
              value={formik.values.firstName}
              disabled={formik.isSubmitting}
              type="text"
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
                      formik.values.establishment === EstablishmentEnum.Hopital
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
                      formik.values.establishment == EstablishmentEnum.Clinique
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
              <Input
                label="Service"
                onChange={formik.handleChange}
                name="service"
                value={formik.values.service}
                disabled={formik.isSubmitting}
                type="text"
              />
            </div>
          </div>
          <div className=" flex flex-row  w-full justify-between">
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="region"
              >
                Région
              </label>
              <Select
                name="region"
                value={region}
                selectedKeys={[region]}
                onChange={(e) => setRegion(e.target.value)}
                items={regions}
                label="Région"
                placeholder="Choisissez une région"
                className="max-w-s"
              >
                {(region) => (
                  <SelectItem value={region.id} key={region.id}>
                    {region.name}
                  </SelectItem>
                )}
              </Select>
            </div>
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="city"
              >
                Ville
              </label>
              <Select
                name="city"
                value={formik.values.city}
                selectedKeys={[formik.values.city]}
                onChange={formik.handleChange}
                items={regions.find((item) => item.id == region)?.city ?? []}
                label="Ville"
                placeholder="Choisissez une Ville"
                className="max-w-s"
              >
                {(city) => (
                  <SelectItem value={city.id} key={city.id}>
                    {city.name}
                  </SelectItem>
                )}
              </Select>
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
                htmlFor="priority"
              >
                Priorité
              </label>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="priority"
                  value="HVT"
                  checked={formik.values.priority === PriorityEnum.HVT}
                  onChange={formik.handleChange}
                />
                <label htmlFor="Prive"> HVT </label>
              </div>
              <div className="flex items-center mb-2 gap-1 ml-2">
                <input
                  type="radio"
                  className="mr-2"
                  name="priority"
                  value="LVT"
                  checked={formik.values.priority == PriorityEnum.LVT}
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
          <Input
            label="Contact Médecin"
            onChange={formik.handleChange}
            name="tel"
            value={formik.values.tel}
            disabled={formik.isSubmitting}
            type="tel"
          />
        </div>
        <div className="mb-6">
          <label
            className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
            htmlFor="mail"
          >
            Contact Mail
          </label>
          <Input
            label="Email Médecin"
            onChange={formik.handleChange}
            name="mail"
            value={formik.values.mail}
            disabled={formik.isSubmitting}
            type="mail"
          />
        </div>
        <div className="flex mb-5 justify-between items-center">
          <Button
            color="white"
            onClick={() => {
              if (
                window.confirm(
                  "Voulez-vous vraiment supprimer ce patient ? Toutes ses demandes seront supprimées..."
                )
              ) {
                deleteDoctor(data.id);
              }
            }}
            bgColor="red"
            text="Supprimer "
            borderRadius="10px"
            disabled={formik.isSubmitting}
          />
          <Button
            type="submit"
            color="white"
            bgColor={currentColor}
            text={isDisabled ? "Modifier" : "Sauvegarder"}
            borderRadius="10px"
            disabled={formik.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
function updateDoctor(values: {
  title: import(".prisma/client").$Enums.TitleEnum;
  firstName: string;
  lastName: string;
  establishment: import(".prisma/client").$Enums.EstablishmentEnum;
  service: string;
  tel: string;
  mail: string;
  secteur: import(".prisma/client").$Enums.SecteurEnum;
  region: string;
  city: string;
  priority: import(".prisma/client").$Enums.PriorityEnum;
  attache: string;
}) {
  throw new Error("Function not implemented.");
}
