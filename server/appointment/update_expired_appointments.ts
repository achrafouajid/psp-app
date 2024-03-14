"use server";
import prisma from "../../prisma/client";
import { AppointmentStatusEnum } from "@prisma/client";

export async function updateExpiredAppointments() {
  const expiredAppointments = await prisma.appointment.findMany({
    where: {
      endTime: {
        lt: new Date(), // Find appointments where endTime is less than the current time
      },
      status: {
        not: AppointmentStatusEnum.Expired, // Exclude appointments already marked as Expired
      },
    },
  });

  for (const appointment of expiredAppointments) {
    await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: AppointmentStatusEnum.Expired,
      },
    });
  }
}
