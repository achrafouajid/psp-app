"use server";
import prisma from "../../prisma/client";
import { revalidatePath } from "next/cache";
type data = {
  id: string;
  startTime: Date;
  endTime: Date;
  patientId: string;
  subject: string;
  note: string | null;
  doctorId: string | null;
};

export default async function updateAppointment(data: data) {
  const appointment = await prisma.appointment.findFirst({
    where: {
      id: data.id,
    },
  });
  if (appointment == null) return false;

  await prisma.appointment.update({
    where: {
      id: data.id,
    },
    data: {
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      patientId: data.patientId,
      subject: data.subject,
      note: data.note,
      doctorId: data.doctorId,
    },
  });
  revalidatePath("/");

  return true;
}
