import prisma from "../../../prisma/client";

export default async function getRequestCount() {
  return await prisma.request.count();
}
