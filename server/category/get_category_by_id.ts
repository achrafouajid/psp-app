import prisma from "../../prisma/client";

export default function get_category_by_id(id: string) {
    return prisma.category.findUnique({
        where: {
            id
        }
    })
}