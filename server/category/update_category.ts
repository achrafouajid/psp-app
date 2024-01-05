import prisma from "../../prisma/client";
import get_category_by_label from "./get_category_by_label";

enum UpdateCategory{
    Success,
    NotFound,
    Conflict
}
export default async function update_category(id: string,label: string,color:string) {
    var exist =await prisma.category.findFirst({
        where: {
            id:id
        }
    })
    if (!exist) return UpdateCategory.NotFound
    if (exist.label != label.trim())
    {
        var existLabel = await get_category_by_label(label);
        if (existLabel)
            return UpdateCategory.Conflict
    }
    await prisma.category.update({
        where: {
            id: exist.id,            
        },
        data: {
            label,
            color
        }
    })
    
        
}