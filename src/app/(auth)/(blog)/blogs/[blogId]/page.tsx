import React from "react";
import get_blog_by_id from "../../../../../../server/blog/get_blog_by_id";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: any }) {
  const data = await get_blog_by_id(params.blogId);
  if (!data) return notFound();
  return (
    <div>
      <h1>{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{ __html: data.content }}
        style={{ whiteSpace: "pre-wrap" }}
        className="text-lg"
      ></p>
    </div>
  );
}
