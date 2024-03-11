"use server";
import prisma from "../../prisma/client";

export default async function doctorWorkload() {
  // Fetch all doctors with their patient counts
  const doctorsWithCounts = await prisma.doctor.findMany({
    include: {
      _count: {
        select: {
          Patient: true,
        },
      },
      city: {
        include: {
          region: true,
        },
      },
    },
  });

  // Filter doctors to only include those with at least one patient
  const doctorsWithPatients = doctorsWithCounts.filter(
    (doctor) => doctor._count.Patient > 0
  );

  return doctorsWithPatients;
}
