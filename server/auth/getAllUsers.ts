import React from "react";
import prisma from "../../prisma/client";
import currentUser from "./currentUser";

export default async function getAllUsers() {
  const user = await currentUser();
  return await prisma.user.findMany({
    where: {
      id: { not: user?.id },
    },
    include: {
      avatar: true,
    },
  });
}
