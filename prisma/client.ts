import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });
if (process.env.NODE_ENV != "production") globalForPrisma.prisma;

prisma.$use(async (params, next) => {
  if (params.action === "findMany" || params.action === "findFirst") {
    Object.entries(params.model!).forEach(([key, value]) => {
      if (key == "deletedAt") {
        params.args.where = {
          ...params.args.where,
          deletedAt: { not: null },
        };
      }
    });
  }
  return next(params);
});

export default prisma;
