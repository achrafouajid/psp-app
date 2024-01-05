import prisma from "../../prisma/client";
import upload from "../upload/upload";

enum UpdateCategory {
    Success,
    NotFound,
    Conflict
}
export default async function update_category(data: FormData) {
    var id = data.get("id")!.toString();
    var image = data.get("image") as File;
    var title = data.get("title")!.toString()
    var content = data.get("content")!.toString()
    var categories = data.get("categories")!.toString().split(",")
    var blog = await prisma.category.findFirst({
        where: {
            id: id
        },
        include: {
            CategoryBlogs: true
        }
    })
    if (!blog) return UpdateCategory.NotFound
    //upload 
    
    var imageId = image ? (await upload(image) ).id:  undefined;
    await prisma.blog.update({
        where: {
            id: blog.id,
        },
        data: {
            imageId,
            content,
            title,
        }
    })

    var blogCategories = blog.CategoryBlogs.map(e => e.categoryId);
    var willnotUpdateCateories = categories.length == blogCategories.length && categories.every(e => blogCategories.includes(e));
    if (!willnotUpdateCateories) {
        await prisma.blogCategory.deleteMany(
            {
                where: {
                    blogId: blog.id,
                }
            }
        )
        await prisma.blogCategory.createMany({
            data: categories.map(e => ({
                blogId: blog!.id,
                categoryId: e
            }))
        })
    }





}