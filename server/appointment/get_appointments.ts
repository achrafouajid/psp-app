import prisma from "../../prisma/client";

export default async function getAppointments() {
  return await prisma.appointment.findMany({
    include: {
      patient: true,
      doctor: true,
    },
  });
}
