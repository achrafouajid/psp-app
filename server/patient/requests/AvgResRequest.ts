"use server";
import { RequestStatusEnum } from "@prisma/client";
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
           MIN(r1.createdAt) AS completedAt,
           MIN(r2.createdAt) AS responseAt
       FROM
           RequestStatus r1
       INNER JOIN
           RequestStatus r2 ON r1.requestId = r2.requestId
       WHERE
           r1.status = ${RequestStatusEnum.Complete}   AND
          (r2.status In (${RequestStatusEnum.Accepte},${RequestStatusEnum.Refuse})   AND r2.current = true) AND
           EXTRACT(MONTH FROM r1.createdAt) = EXTRACT(MONTH FROM r2.createdAt) AND
           EXTRACT(YEAR FROM r1.createdAt) = EXTRACT(YEAR FROM r2.createdAt)
       GROUP BY
           r1.requestId,
           r1.createdAt
           HAVING
        MIN(r2.createdAt) IS NOT NULL
   )
   SELECT
       EXTRACT(MONTH FROM completedAt) AS month,
       EXTRACT(YEAR FROM completedAt) AS year,
       AVG(responseAt - completedAt) AS avgResponseTime
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
  console.log(res);
  return res;
}
