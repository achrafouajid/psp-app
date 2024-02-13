import React from "react";
import prisma from "../../../prisma/client";
import { RequestStatusEnum } from "@prisma/client";

export default async function getRequestsCount() {
  return await prisma.request.count();
}

export async function getConstitueRequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Constitue,
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
          status: { in: [RequestStatusEnum.Accepte, RequestStatusEnum.Refuse] },
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
          status: RequestStatusEnum.Complete,
          current: true,
        },
      },
    },
  });
}

export async function getAcceptedRequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Accepte,
          current: true,
        },
      },
    },
  });
}

export async function getRefusedRequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Refuse,
          current: true,
        },
      },
    },
  });
}
export async function getCreatedequestsCount() {
  return await prisma.request.count({
    where: {
      statuses: {
        some: {
          status: RequestStatusEnum.Cree,
          current: true,
        },
      },
    },
  });
}
