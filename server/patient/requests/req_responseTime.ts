import prisma from "../../../prisma/client";

async function calculateTimeBetweenStatuses() {
  // Step  1: Fetch the RequestStatus records for the specific request
  const requestStatuses = await prisma.requestStatus.findMany({
    orderBy: { createdAt: "asc" }, // Ensure they are ordered by creation time
  });

  // Step  2: Identify the "Complete" status
  const completeStatus = requestStatuses.find(
    (status) => status.status === "Complete"
  );

  if (!completeStatus) {
    console.log('"Complete" status not found for the request.');
    return;
  }

  // Step  3: Identify the "Accepte" or "Refuse" status
  const endStatus = requestStatuses.find(
    (status) => status.status === "Accepte" || status.status === "Refuse"
  );

  if (!endStatus) {
    console.log('Neither "Accepte" nor "Refuse" status found for the request.');
    return;
  }

  // Ensure createdAt fields are treated as Date objects
  const completeDate = new Date(completeStatus.createdAt);
  const endDate = new Date(endStatus.createdAt);

  // Step  4: Calculate the time difference
  const timeDifference = endDate.getTime() - completeDate.getTime();
  const timeDifferenceInDays = timeDifference / (1000 * 60 * 60 * 24);

  console.log(
    `Time between "Complete" and "${endStatus.status}" statuses: ${timeDifferenceInDays} days`
  );
}

// Example usage
calculateTimeBetweenStatuses();
