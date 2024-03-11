"use server";
import prisma from "../../prisma/client";

// Define the type for the data
interface NewPatientsCountByMonth {
  month: string; // Changed from number to string to accommodate month names
  year: number;
  count: number;
}

export async function getNewPatientsCountByMonth(): Promise<
  NewPatientsCountByMonth[]
> {
  // Use the defined type with $queryRaw
  const newPatientsCountByMonth: NewPatientsCountByMonth[] =
    await prisma.$queryRaw`
    SELECT
      EXTRACT(MONTH FROM createdAt) AS month,
      EXTRACT(YEAR FROM createdAt) AS year,
      COUNT(*) AS count
    FROM
      Patient
    GROUP BY
      year, month
    ORDER BY
      year, month;
 `;

  // Format the result to include only the month and count
  // Adjusted to return month names in French
  const formattedResult = newPatientsCountByMonth.map(
    ({ month, year, count }) => {
      // Convert the month name to a numeric index
      const monthIndex = new Date(year, 0)
        .toLocaleString("fr-FR", { month: "long" })
        .indexOf(month);
      return {
        month: month, // Keep the month name as is
        count: count,
      };
    }
  );

  return formattedResult as unknown as NewPatientsCountByMonth[];
}
