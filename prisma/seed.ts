import {
  PriorityEnum,
  PrismaClient,
  SecteurEnum,
  TitleEnum,
  UserRole,
} from "@prisma/client";
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

  const cities = {
    Rabat: {
      id: "1xgfctjxfgdfgfch",
      name: "Rabat",
    },
    Tanger: {
      id: "2hdfghgfjjfdy",
      name: "Tanger",
    },
    Kenitra: {
      id: "xdhtdjtyuutè3",
      name: "Kénitra",
    },
    Fes: {
      id: "fdgdfhygfxbxdfbvgfxd",
      name: "Fès",
    },
    Oujda: {
      id: "dsfdgdfhygjugfsdfgd",
      name: "Oujda",
    },
    Meknes: {
      id: "fdgsdfghgdgdfsgsdf",
      name: "Meknès",
    },
    Casablanca: {
      id: "fdgsdfghzeezgdgdfsgsdf",
      name: "Casablanca",
    },
    Marrakech: {
      id: "fdgsdfghgdzezegdfsgsdf",
      name: "Marrakech",
    },
    Agadir: {
      id: "fdgsdAgadirdfsgzeezzesdf",
      name: "Agadir",
    },
  };

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
  const casasud = await prisma.region.upsert({
    where: { name: "Casa Sud" },
    update: {},
    create: {
      name: "Casa Sud",
      city: {
        createMany: {
          data: [cities.Casablanca, cities.Marrakech, cities.Agadir],
        },
      },
    },
  });

  const rabatnord = await prisma.region.upsert({
    where: { name: "Rabat Nord" },
    update: {},
    create: {
      name: "Rabat Nord",
      city: {
        createMany: {
          data: [cities.Rabat, cities.Tanger, cities.Kenitra],
        },
      },
    },
  });
  const fesoriantale = await prisma.region.upsert({
    where: { name: "Fes Orientale" },
    update: {},
    create: {
      name: "Fes Orientale",
      city: {
        createMany: {
          data: [cities.Oujda, cities.Fes, cities.Meknes],
        },
      },
    },
  });

  const doctor1 = await prisma.doctor.createMany({
    data: [
      {
        firstName: "NAHID",
        lastName: "ZAGHBA",
        title: TitleEnum.Pr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "WIAM",
        lastName: "EL KHATTABI",
        title: TitleEnum.Pr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "KHADIJA",
        lastName: "ECH-CHILALI",
        title: TitleEnum.Pr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "ABDELAZIZ",
        lastName: "BAKHATAR",
        title: TitleEnum.Pr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "LAMIA",
        lastName: "HASSANI",
        title: TitleEnum.Dr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
    ],
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
