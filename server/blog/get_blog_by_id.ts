import prisma from "../../prisma/client";

export default async function get_blog_by_id(id: string) {
    return await prisma.blog.findUnique({
        where: {
            id
        }
    })
}