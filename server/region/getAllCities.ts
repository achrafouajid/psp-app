"use server";
import prisma from "../../prisma/client";

export default async function getAllCities() {
  const cities = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
      region: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const citiesMap = new Map();

  cities.forEach((city) => {
    citiesMap.set(city.id, city.region);
  });

  return citiesMap;
}
