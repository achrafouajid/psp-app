"use server";
import prisma from "../../../prisma/client";

export type avgRespo2 = {
  month: number;
  year: number;
  avgResponseTime: number;
}[];
export default async function calculateAverageResponseTime() {
  const result: avgRespo2 = await prisma.$queryRaw`
  WITH CompletedRequests AS (
    SELECT
        r1.requestId,
        r1.createdAt AS startedAt,
        MIN(r2.createdAt) AS completedAt
    FROM
        RequestStatus r1
    INNER JOIN
        RequestStatus r2 ON r1.requestId = r2.requestId
    WHERE
        r1.status = 'Complete' AND
        (r2.status = 'Accepted' OR r2.status = 'Refused') AND
        EXTRACT(MONTH FROM r1.createdAt) = EXTRACT(MONTH FROM r2.createdAt) AND
        EXTRACT(YEAR FROM r1.createdAt) = EXTRACT(YEAR FROM r2.createdAt)
    GROUP BY
        r1.requestId,
        r1.createdAt
    HAVING
        MIN(r2.createdAt) IS NOT NULL
)
SELECT
    EXTRACT(MONTH FROM startedAt) AS month,
    EXTRACT(YEAR FROM startedAt) AS year,
    AVG(completedAt - startedAt) AS avgCompletionTime
FROM
    CompletedRequests
GROUP BY
    month,
    year;
  `;

  const res = result.map((e) => ({
    ...e,
    avgResponseTime: Number(e.avgResponseTime),
  }));
  return res;
}
