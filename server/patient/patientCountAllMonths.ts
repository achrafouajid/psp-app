import prisma from "../../prisma/client";

interface MonthlyPatientCount {
  month: number;
  count: number;
}

async function getPatientsCountForYear(
  year: number
): Promise<MonthlyPatientCount[]> {
  const monthCounts: MonthlyPatientCount[] = [];

  for (let month = 0; month < 12; month++) {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    try {
      const patientsThisMonth = await prisma.patient.findMany({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });

      const count = patientsThisMonth.length;
      monthCounts.push({ month: month + 1, count }); // Adding 1 to month because JavaScript months are 0-indexed
    } catch (error) {
      // Handle any errors that might occur during the database query
      console.error(`Error fetching patients for month ${month + 1}:`, error);
      throw error;
    }
  }

  return monthCounts;
}
