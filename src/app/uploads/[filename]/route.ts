import fs from "fs";
import { join } from "path";

type GetParams = {
  params: {
    filename: string;
  };
};

export async function GET(req: Request, { params }: GetParams) {
  const filename = params.filename;
  const filePath = join(process.cwd(), "uploads", filename);
  const fileContents = await fs.promises.readFile(filePath);

  return new Response(fileContents, {
    headers: {
      "content-type": "application/octet-stream",
      "content-disposition": `attachment; filename="${filename}"`,
    },
  });
}
