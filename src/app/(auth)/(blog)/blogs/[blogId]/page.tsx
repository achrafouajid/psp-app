import React from "react";
import get_blog_by_id from "../../../../../../server/blog/get_blog_by_id";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }: { params: any }) {
  const data = await get_blog_by_id(params.blogId);
  if (!data) return notFound();
  return (
    <div>
      <div className="w-1/4 p-8">
        <Link href="/blogs" className="text-blue-500">
          {" "}
          Retourner à la liste des blogs
        </Link>
      </div>
      <div className="mx-auto w-1/2 p-8">
        <div className="mb-4">
          <div className="text-gray-500">
            {data.publishedAt.toLocaleDateString("fr")}
          </div>
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <div className="text-gray-500 mb-4">
            {data.author.lastName}
            {data.author.firstName}
          </div>
          <div className="text-gray-500 mb-4"></div>
        </div>
        <Image
          src={data.image.url ? "/" + data.image.url : "/noimage.png"}
          alt="Blog Image"
          className="rounded-md w-full mb-4"
          width={1000}
          height={1000}
        />
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: data.content }}
            style={{ whiteSpace: "pre-wrap" }}
            className="text-lg"
          ></p>
        </div>
      </div>
    </div>
  );
}
