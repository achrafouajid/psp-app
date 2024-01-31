import { PrismaClient, UserRole } from "@prisma/client";
import Hash from "../server/utils/Hash";
const prisma = new PrismaClient();
async function main() {
  const password = Hash.make("123456789");
  const admin = await prisma.user.upsert({
    where: { email: "admin@rafiki.ma" },
    update: {},
    create: {
      email: "admin@rafiki.ma",
      firstName: "Admin",
      lastName: "test",
      passwordHash: password,
      role: UserRole.Admin,
    },
  });
  const laboratoire = await prisma.user.upsert({
    where: { email: "laboratoire@rafiki.ma" },
    update: {},
    create: {
      email: "laboratoire@rafiki.ma",
      firstName: "Laboratoire",
      lastName: "test",
      passwordHash: password,
      role: UserRole.Lab,
    },
  });
  const infirmiere = await prisma.user.upsert({
    where: { email: "infirmiere@rafiki.ma" },
    update: {},
    create: {
      email: "Infirmiere@rafiki.ma",
      firstName: "infirmiere",
      lastName: "test",
      passwordHash: password,
      role: UserRole.Nurse,
    },
  });
  const patient = await prisma.user.upsert({
    where: { email: "patient@rafiki.ma" },
    update: {},
    create: {
      email: "patient@rafiki.ma",
      firstName: "Patient",
      lastName: "test",
      passwordHash: password,
      role: UserRole.Patient,
    },
  });
  const casasud = await prisma.region.create({
    data: {
      name: "Casa Sud",
      city: {
        connect: {
          id: casasud.id,
          name: "Casablanca",
        },
      },
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      firstName: "NAHID",
      lastName: "ZAGHBA",
      title: "Dr",
      city: {
        connect: {
          name: "Casablanca",
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
