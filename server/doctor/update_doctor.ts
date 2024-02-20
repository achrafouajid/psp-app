"use server";
import {
  EstablishmentEnum,
  PriorityEnum,
  SecteurEnum,
  TitleEnum,
} from "@prisma/client";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";
import getDoctor from "./get_doctor";
type data = {
  id: string;
  title: TitleEnum;
  firstName: string;
  lastName: string;
  establishment: EstablishmentEnum;
  service?: string;
  tel: string;
  mail: string;
  secteur: SecteurEnum;
  region: string;
  city: string;
  priority: PriorityEnum;
};
export default async function updateDoctor(data: data) {
  const doctor = await getDoctor(data.id!);
  if (doctor == null) return false;

  await prisma.doctor.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      establishment: data.establishment,
      service: data.service,
      tel: data.tel,
      mail: data.mail,
      secteur: data.secteur,
      cityId: data.city,
      priority: data.priority,
    },
  });
  revalidatePath("/");

  return true;
}
