"use server";
import { Document, RequestStatusEnum } from "@prisma/client";
import prisma from "../../../prisma/client";

export default async function newRequestStatus(
  requestId: string,
  status: RequestStatusEnum,
  remark?: string,
  documents?: Document[]
) {
  await prisma.requestStatus.updateMany({
    where: {
      requestId: requestId,
    },
    data: {
      current: false,
    },
  });
  const reqStatus = await prisma.requestStatus.create({
    data: {
      createdAt: new Date(),
      current: true,
      status: status,
      requestId: requestId,
      remark: remark,
    },
  });

  if (documents?.length) {
    await prisma.requestDocument.createMany({
      data: documents.map((i) => ({
        documentId: i.id,
        requestStatusId: reqStatus.id,
      })),
    });
  }
}
