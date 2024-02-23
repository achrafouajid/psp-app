"use server";
import prisma from "../../prisma/client";

type data = {
  startTime: string;
  endTime: string;
  patientId: string;
  subject: string;
};

export default async function createAppointmentForPatient(data: data) {
  return await prisma.appointment.create({
    data: {
      patientId: data.patientId,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      subject: data.subject,
    },
  });
}
