import prisma from "../../prisma/client";

export default async function getAppointment(id: string) {
  return await prisma.appointment.findFirst({
    where: {
      id: id,
    },
    include: {
      doctor: true,
      patient: true,
    },
  });
}
