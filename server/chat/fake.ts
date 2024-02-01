import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../../prisma/client";
export default async function main() {
  await prisma.message.createMany({
    data: Array.from(Array(100000).keys()).map((e) => ({
      content: faker.lorem.paragraph(),
      receiverId: "cls1l2fb00000t6zob2v6jso6",
      senderId: "clrun16v00000vp7n7bstuqmr",
      createdAt: faker.date.past(),
    })),
  });
}
