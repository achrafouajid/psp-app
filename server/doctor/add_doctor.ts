"use server";
import {
  DiagnosticEnum,
  EducationEnum,
  EstablishmentEnum,
  HabitatEnum,
  ProgramEnum,
  SocialEnum,
} from "@prisma/client";
import prisma from "../../prisma/client";
import { registerResponseEnum } from "../auth/types";
import { revalidatePath } from "next/cache";

type data = {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  notes?: string;
  program: ProgramEnum;
  isMajor: boolean;
  isConfDiag: boolean;
  isSocial: boolean;
  isConsent: boolean;
  isIncomplete: boolean;
  isAbroad: boolean;
  isUnreachable: boolean;
  docfirstName: string;
  doclastName: string;
  establishment: EstablishmentEnum;
  service: string;
  inclDate: string;
  tel: string;
  mail: string;
  social: SocialEnum;
  othersocial: string;
  education: EducationEnum;
  habitat: HabitatEnum;
  iscaregiver: boolean;
  caregiverfullName: string;
  caregivertel: string;
  diagnostic: DiagnosticEnum;
  diagnosticDate: string;
  prerequest: boolean;
  statusrequest: boolean;
  refDoc: boolean;
};

export default async function addDoctor(data: data) {
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };

  await prisma.doctor.create({
    data: {
      establishment: data.establishment,
      service: data.service,
      firstName: data.docfirstName,
      lastName: data.doclastName,
    },
  });

  response.status = registerResponseEnum.success;
  revalidatePath("/");

  return response;
}
