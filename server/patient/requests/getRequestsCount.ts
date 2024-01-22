import React from "react";
import prisma from "../../../prisma/client";
import { RequestStatusEnum } from "@prisma/client";

export default async function getRequestsCount() {
  return await prisma.request.count();
}
export async function getAcceptedRequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Accepted,
          current: true,
        },
      },
    },
  });
}
export async function getCompletedRequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Complete,
          current: true,
        },
      },
    },
  });
}

export async function getPendingRequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Pending,
          current: true,
        },
      },
    },
  });
}
