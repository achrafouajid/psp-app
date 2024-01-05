import { writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import prisma from "../../prisma/client";

export default async function upload(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const url = join(
    "uploads",
    new Date().getTime().toString().concat(file.name)
  );
  var path = join(
    cwd(),
    "uploads",
    new Date().getTime().toString().concat(file.name)
  );
  await writeFile(path, buffer);
  return await prisma.document.create({
    data: {
      memeType: "image/png",
      path,
      url,
    },
  });
}
