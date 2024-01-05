"use server";
import prisma from "../../prisma/client";

export default async function get_categories() {
  return await prisma.category.findMany({});
}
