"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";
import getPatient from "../patient/get_patient";

type data = {
  startTime: string;
  endTime: string;
  patientId: string;
  subject: string;
  note: string;
  room: string;
  doctorId: string;
};

export default async function createAppointmentForPatient(data: data) {
  const patient = await getPatient(data.patientId!);
  if (patient == null) return false;
  await prisma.appointment.create({
    data: {
      patientId: data.patientId,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      subject: data.subject,
      note: data.note,
      room: data.room,
      doctorId: data.doctorId,
    },
  });
  revalidatePath("/");
}
