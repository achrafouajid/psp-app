"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { registerResponseEnum } from "../../../../../server/auth/types";
import {
  EstablishmentEnum,
  PriorityEnum,
  SecteurEnum,
  TitleEnum,
} from "@prisma/client";
import addDoctor from "../../../../../server/doctor/add_doctor";
import getAllRegions from "../../../../../server/region/getAllRegions";
import { useRouter } from "next/navigation";

export default function AddDoctor({
  regions,
}: {
  regions: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>;
}) {
  const { currentColor } = useStateContext();
  const [region, setRegion] = useState(regions.at(0)?.id as string);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: TitleEnum.Dr as TitleEnum,
      firstName: "",
      lastName: "",
      establishment: null as never as EstablishmentEnum,
      service: "",
      tel: "",
      mail: "",
      secteur: null as never as SecteurEnum,
      region: "",
      city: "",
      priority: null as never as PriorityEnum,
      attache: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await addDoctor(values);
      if (res.status == registerResponseEnum.exist)
        toast.error("Ce médecin existe déjà  !");
      else {
        toast.success("Médecin ajouté avec succès !");
        router.push("/doctors");
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
    <div className="w-full mx-4 rounded-lg p-8">
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
                  <Checkbox
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
              <div className="flex flex-row">
                <div className="flex items-center mb-2 gap-1 ml-2">
                  <Checkbox
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
