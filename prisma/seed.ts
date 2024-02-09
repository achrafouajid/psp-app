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
  const fesorientale = await prisma.region.upsert({
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
      {
        firstName: "RACHID",
        lastName: "KHETTAR",
        title: TitleEnum.Dr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "WASILA",
        lastName: "GADDAR",
        title: TitleEnum.Dr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "Hind",
        lastName: "JANAH",
        title: TitleEnum.Dr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },

      {
        firstName: "BOUCHRA",
        lastName: "DAHER",
        title: TitleEnum.Pr,
        cityId: cities.Casablanca.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "Lamyae",
        lastName: "AMRO",
        title: TitleEnum.Pr,
        cityId: cities.Marrakech.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "AMINE",
        lastName: "BENJELLOUNE",
        title: TitleEnum.Pr,
        cityId: cities.Marrakech.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "AZEDINE",
        lastName: "MOHAMMADI",
        title: TitleEnum.Dr,
        cityId: cities.Marrakech.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },

      {
        firstName: "HAFSA",
        lastName: "SAJIAA",
        title: TitleEnum.Pr,
        cityId: cities.Marrakech.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },

      {
        firstName: "ANFAS",
        lastName: "ASRIRI",
        title: TitleEnum.Dr,
        cityId: cities.Marrakech.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },

      {
        firstName: "LAMYAE",
        lastName: "ESSAADOUNI",
        title: TitleEnum.Pr,
        cityId: cities.Marrakech.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "HIND",
        lastName: "SARHANE",
        title: TitleEnum.Pr,
        cityId: cities.Agadir.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },

      {
        firstName: "SALMA",
        lastName: "TELLOU",
        title: TitleEnum.Dr,
        cityId: cities.Agadir.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "KARIMA",
        lastName: "MARC",
        title: TitleEnum.Pr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "EL GHALI",
        lastName: "IRAQI",
        title: TitleEnum.Pr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "SANAE",
        lastName: "HAMMI",
        title: TitleEnum.Pr,
        cityId: cities.Tanger.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "LEILA",
        lastName: "HERRAK",
        title: TitleEnum.Pr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "MUSTAPHA",
        lastName: "EL FTOUH",
        title: TitleEnum.Pr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "NAIMA",
        lastName: "ZEMED",
        title: TitleEnum.Dr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "NADIA",
        lastName: "AMANGAR",
        title: TitleEnum.Dr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "FATIMA EZZAHRA",
        lastName: "SQALLY HOUSSAINI",
        title: TitleEnum.Dr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "HASSAN",
        lastName: "ASSBAAI",
        title: TitleEnum.Dr,
        cityId: cities.Tanger.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "FIRDAOUSS",
        lastName: "SAHNOUN",
        title: TitleEnum.Dr,
        cityId: cities.Tanger.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "HIND",
        lastName: "LAHLOU",
        title: TitleEnum.Dr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "HANANE",
        lastName: "HADDAOUI",
        title: TitleEnum.Dr,
        cityId: cities.Tanger.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "LAMYAE",
        lastName: "CHRIF MORAND",
        title: TitleEnum.Dr,
        cityId: cities.Kenitra.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "ABDELLAH",
        lastName: "HAMDOUCH",
        title: TitleEnum.Dr,
        cityId: cities.Rabat.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "MOUNIA",
        lastName: "SERRAJ",
        title: TitleEnum.Dr,
        cityId: cities.Fes.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "BOUCHRA",
        lastName: "AMARA",
        title: TitleEnum.Dr,
        cityId: cities.Fes.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "HATIM",
        lastName: "KOUISMI",
        title: TitleEnum.Dr,
        cityId: cities.Oujda.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "AFAF",
        lastName: "THOUIL",
        title: TitleEnum.Dr,
        cityId: cities.Oujda.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "SAMIRA",
        lastName: "MOKAHLI",
        title: TitleEnum.Dr,
        cityId: cities.Oujda.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "MOHAMED",
        lastName: "STOULI",
        title: TitleEnum.Dr,
        cityId: cities.Meknes.id,
        secteur: SecteurEnum.Prive,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "LAMYAE",
        lastName: "SENHAJI",
        title: TitleEnum.Dr,
        cityId: cities.Fes.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.LVT,
      },
      {
        firstName: "SARA",
        lastName: "GARTINI",
        title: TitleEnum.Dr,
        cityId: cities.Oujda.id,
        secteur: SecteurEnum.Public,
        priority: PriorityEnum.HVT,
      },
      {
        firstName: "KHALID",
        lastName: "ROUIJEL",
        title: TitleEnum.Dr,
        cityId: cities.Meknes.id,
        secteur: SecteurEnum.Public,
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
