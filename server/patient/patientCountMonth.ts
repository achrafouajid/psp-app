import prisma from "../../prisma/client";

async function getPatientsCountThisMonth() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  try {
    const patientsThisMonth = await prisma.patient.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return patientsThisMonth.length;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
}
