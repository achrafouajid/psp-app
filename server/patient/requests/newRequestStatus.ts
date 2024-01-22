import { RequestStatusEnum } from "@prisma/client";
import prisma from "../../../prisma/client";

export default async function newRequestStatus(
  requestId: string,
  status: RequestStatusEnum
) {
  await prisma.requestStatus.updateMany({
    where: {
      requestId: requestId,
    },
    data: {
      current: false,
    },
  });
  await prisma.requestStatus.create({
    data: {
      createdAt: new Date(),
      current: true,
      status: status,
      requestId: requestId,
    },
  });
}
