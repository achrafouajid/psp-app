"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
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
import deleteDoctor from "../../../../../../server/doctor/delete_doctor";
import getDoctor from "../../../../../../server/doctor/get_doctor";
import updateDoctor from "../../../../../../server/doctor/update_doctor";
import { CiSettings } from "react-icons/ci";

export default function DoctorProfile({
  regions,
  data,
}: {
  regions: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>;
  data: NonNullable<Awaited<ReturnType<typeof getDoctor>>>;
}) {
  const { currentColor } = useStateContext();
  const ref = useRef<HTMLInputElement>(null);
  const [isDisabled, setisDisabled] = useState(true);
  const [region, setRegion] = useState(regions.at(0)?.id as string);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      ...data,
      establishment: data.establishment as EstablishmentEnum,
      service: data.service as string,
      tel: data.tel as string,
      mail: data.mail as string,
      secteur: data.secteur as SecteurEnum,
      city: data.cityId as string,
      region: region as string,
      priority: data.priority as PriorityEnum,
    },
    onSubmit: async (values) => {
      if (isDisabled) return setisDisabled(false);

      const res = await updateDoctor(values);
      if (res) {
        toast.success("Informations mises à jour avec succès !");
        router.push("/doctors");
      } else toast.error("Erreur  !");
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
              Titre
            </label>
            <div className="relative">
              <Select
                label="Titre"
                isRequired={true}
                onChange={formik.handleChange}
                selectedKeys={[formik.values.title]}
                name="title"
                value={formik.values.title}
                disabled={formik.isSubmitting}
              >
                {Object.values(TitleEnum).map((e) => (
                  <SelectItem isReadOnly={isDisabled} key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
              htmlFor="lastName"
            >
              Nom Médecin traitant
            </label>
            <Input
              readOnly={isDisabled}
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
              Prénom Médecin traitant
            </label>
            <Input
              readOnly={isDisabled}
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
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="establishment"
                    value={EstablishmentEnum.Hopital}
                    isSelected={
                      formik.values.establishment == EstablishmentEnum.Hopital
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "establishment",

                        !e.currentTarget.checked
                          ? null
                          : EstablishmentEnum.Hopital
                      )
                    }
                  >
                    {EstablishmentEnum.Hopital}
                  </Checkbox>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="establishment"
                    value={EstablishmentEnum.Clinique}
                    isSelected={
                      formik.values.establishment == EstablishmentEnum.Clinique
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "establishment",
                        !e.currentTarget.checked
                          ? null
                          : EstablishmentEnum.Clinique
                      )
                    }
                  >
                    {EstablishmentEnum.Clinique}
                  </Checkbox>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="establishment"
                    value={EstablishmentEnum.Cabinet}
                    isSelected={
                      formik.values.establishment == EstablishmentEnum.Cabinet
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "establishment",
                        !e.currentTarget.checked
                          ? null
                          : EstablishmentEnum.Cabinet
                      )
                    }
                  >
                    {EstablishmentEnum.Cabinet}
                  </Checkbox>
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
                readOnly={isDisabled}
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
                  <SelectItem
                    isReadOnly={isDisabled}
                    value={region.id}
                    key={region.id}
                  >
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
                  <SelectItem
                    isReadOnly={isDisabled}
                    value={city.id}
                    key={city.id}
                  >
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
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="secteur"
                    value={SecteurEnum.Public}
                    isSelected={formik.values.secteur == SecteurEnum.Public}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "secteur",

                        !e.currentTarget.checked ? null : SecteurEnum.Public
                      )
                    }
                  >
                    {SecteurEnum.Public}
                  </Checkbox>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="secteur"
                    value={SecteurEnum.Prive}
                    isSelected={formik.values.secteur == SecteurEnum.Prive}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "secteur",
                        !e.currentTarget.checked ? null : SecteurEnum.Prive
                      )
                    }
                  >
                    {SecteurEnum.Prive}
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-3 items-center">
              <label
                className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                htmlFor="priority"
              >
                Priorité
              </label>
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="priority"
                    value={PriorityEnum.HVT}
                    isSelected={formik.values.priority == PriorityEnum.HVT}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "priority",

                        !e.currentTarget.checked ? null : PriorityEnum.HVT
                      )
                    }
                  >
                    {PriorityEnum.HVT}
                  </Checkbox>
                </div>
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
                    isReadOnly={isDisabled}
                    name="priority"
                    value={PriorityEnum.LVT}
                    isSelected={formik.values.priority == PriorityEnum.LVT}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "priority",
                        !e.currentTarget.checked ? null : PriorityEnum.LVT
                      )
                    }
                  >
                    {PriorityEnum.LVT}
                  </Checkbox>
                </div>
              </div>
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
          <Input
            readOnly={isDisabled}
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
            readOnly={isDisabled}
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
                window.confirm("Voulez-vous vraiment supprimer ce médecin ?")
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
            icon={isDisabled ? <CiSettings size={20} className="mr-2" /> : null}
            text={isDisabled ? "Modifier" : "Sauvegarder"}
            borderRadius="10px"
            disabled={formik.isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
