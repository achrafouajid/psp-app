"use server";
import {
  EstablishmentEnum,
  PriorityEnum,
  SecteurEnum,
  TitleEnum,
} from "@prisma/client";
import prisma from "../../prisma/client";
import { registerResponseEnum } from "../auth/types";
import { revalidatePath } from "next/cache";

type data = {
  title: TitleEnum;
  firstName: string;
  lastName: string;
  establishment: EstablishmentEnum;
  service: string;
  tel: string;
  mail: string;
  secteur: SecteurEnum;
  city: string;
  priority: PriorityEnum;
};

export default async function addDoctor(data: data) {
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };

  await prisma.doctor.create({
    data: {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      establishment: data.establishment,
      service: data.service,
      secteur: data.secteur,
      cityId: data.city,
      priority: data.priority,
      tel: data.tel,
      mail: data.mail,
    },
  });

  response.status = registerResponseEnum.success;
  revalidatePath("/");

  return response;
}
