import prisma from "../../prisma/client";

export default async function get_blog_by_id(id: string) {
  return await prisma.blog.findUnique({
    where: {
      id,
    },
    select: {
      image: true,
      publishedAt: true,
      author: true,
      content: true,
      categories: true,
      title: true,
    },
  });
}
