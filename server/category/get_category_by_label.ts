import prisma from "../../prisma/client";

export default function get_category_by_label(label: string) {
    return prisma.category.findFirst({
        where: {
            label:label
        }
    })
}