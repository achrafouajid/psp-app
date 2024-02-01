"use server";
import {
  DiagnosticEnum,
  EducationEnum,
  HabitatEnum,
  ProgramEnum,
  SocialEnum,
} from "@prisma/client";
import prisma from "../../prisma/client";
import { registerResponseEnum } from "../auth/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type data = {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  notes?: string;
  doctor?: string;
  program: ProgramEnum;
  isMajor: boolean;
  isConfDiag: boolean;
  isSocial: boolean;
  isConsent: boolean;
  isIncomplete: boolean;
  isAbroad: boolean;
  isUnreachable: boolean;
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

export default async function addPatient(data: data) {
  const response = {
    status: registerResponseEnum.exist,
    data: "",
  };

  await prisma.patient.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      program: data.program,
      address: data.address,
      birthDate: new Date(data.birthDate),
      notes: data.notes,
      doctor: {
        connect: {
          id: data.doctor,
        },
      },
      diagnostic: data.diagnostic,
      isMajor: data.isMajor,
      isConfDiag: data.isConfDiag,
      isSocial: data.isSocial,
      isConsent: data.isConsent,
      isIncomplete: data.isIncomplete,
      isAbroad: data.isAbroad,
      isUnreachable: data.isUnreachable,
      inclDate: new Date(data.inclDate),
      social: data.social,
      othersocial: data.othersocial,
      education: data.education,
      habitat: data.habitat,
      tel: data.tel,
      mail: data.mail,
      iscaregiver: data.iscaregiver,
      caregiver: {
        create: {
          fullName: data.caregiverfullName,
          tel: data.caregivertel,
        },
      },
    },
  });

  response.status = registerResponseEnum.success;
  revalidatePath("/");
  redirect("/patients");

  return response;
}
