import prisma from "../../prisma/client";

export async function getAllCallPatients() {
  const date45DaysAgo = new Date();
  date45DaysAgo.setDate(date45DaysAgo.getDate() - 45);

  // Fetch all patients along with their latest request status and related documents
  const patients = await prisma.patient.findMany({
    include: {
      requests: {
        include: {
          statuses: {
            include: {
              request: true, // Include the request to get the creation date
            },
            orderBy: {
              createdAt: "desc", // Order by creation date in descending order to get the latest status first
            },
            take: 1, // Only take the latest status
          },
        },
      },
    },
  });

  // Filter patients based on the condition and calculate the time since the refusal or accepted request status
  const filteredPatients = patients
    .map((patient) => {
      const latestStatus = patient.requests[0]?.statuses[0];
      if (!latestStatus || !["Refuse", "Accepte"].includes(latestStatus.status))
        return null; // Exclude if no status or not "Refuse" or "Accepte"

      const timeSinceStatus =
        new Date().getTime() -
        new Date(latestStatus.request.createdAt).getTime();
      const daysSinceStatus = Math.floor(
        timeSinceStatus / (1000 * 60 * 60 * 24)
      );

      // Check if daysSinceStatus is greater than 45
      if (daysSinceStatus <= 45) return null;

      return {
        patient,
        timeSinceStatus: daysSinceStatus, // Time since the refusal or accepted request status in days
      };
    })
    .filter((item) => item !== null); // Filter out null values (patients not meeting the condition)

  return filteredPatients;
}
