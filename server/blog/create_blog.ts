"use server";
import prisma from "../../prisma/client";
import currentUser from "../auth/currentUser";
import upload from "../upload/upload";

enum CategoryEnum {
  Exist,
  Success,
}
export default async function create_blog(
  data: FormData
): Promise<CategoryEnum> {
  var user = await currentUser();
  var image = data.get("image") as File;
  var title = data.get("title")!.toString();
  var content = data.get("content")!.toString();
  var categories = data.getAll("categories").map((e) => e.toString());
  var imageDoc = await upload(image);

  const blog = await prisma.blog.create({
    data: {
      imageId: imageDoc.id,
      content,
      title,
      authorId: user!.id,
    },
  });
  if (categories.length > 0)
    await prisma.blogCategory.createMany({
      data: categories.map((e) => ({
        blogId: blog.id,
        categoryId: e,
      })),
    });

  return CategoryEnum.Success;
}
