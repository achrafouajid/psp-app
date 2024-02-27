import prisma from "../../../prisma/client";

async function calculateTimeBetweenStatuses() {
  // Step  1: Fetch the RequestStatus records for the specific request
  const requestStatuses = await prisma.requestStatus.findMany({
    orderBy: { createdAt: "asc" }, // Ensure they are ordered by creation time
  });

  // Step  2: Identify the "Cree" and "Complete" statuses
  const creeStatus = requestStatuses.find((status) => status.status === "Cree");
  const completeStatus = requestStatuses.find(
    (status) => status.status === "Complete"
  );

  if (!creeStatus || !completeStatus) {
    console.log(
      'Either "Cree" or "Complete" status not found for the request.'
    );
    return;
  }

  // Ensure createdAt fields are treated as Date objects
  const creeDate = new Date(creeStatus.createdAt);
  const completeDate = new Date(completeStatus.createdAt);

  // Step  3: Calculate the time difference
  const timeDifference = completeDate.getTime() - creeDate.getTime();
  const timeDifferenceInDays = timeDifference / (1000 * 60 * 60 * 24);

  console.log(
    `Time between "Cree" and "Complete" statuses: ${timeDifferenceInDays} days`
  );
}

// Example usage
calculateTimeBetweenStatuses();
