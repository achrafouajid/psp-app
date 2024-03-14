import prisma from "../../prisma/client";

export default async function getPublishedBlogs() {
  return await prisma.blog.findMany({
    where: {
      status: "Publie", // Filter blogs with status 'Publie'
    },
    select: {
      status: true,
      notes: true,
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        include: {
          avatar: true,
        },
      },
      image: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}
