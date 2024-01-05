import prisma from "../../prisma/client";

export default async function remove_blog(id: string) {
    return await prisma.category.findFirst({
        where: {
            id:id
        }
    })
}