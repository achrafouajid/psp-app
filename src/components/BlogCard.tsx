import React from "react";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import get_blogs from "../../server/blog/get_blogs";
import Image from "next/image";

const BlogCard = (props: Awaited<ReturnType<typeof get_blogs>>[number]) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden drop-shadow-md">
      <div className="overflow-hidden rounded-t-lg">
        <Image
          className=" w-full object-fill"
          src={props.image.url ? "/" + props.image.url : "/noimage.png"}
          alt="noimg"
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <span className="bg-eeffcc rounded-md border border-ccf px-2 py-1 inline-block">
          {props.author.lastName}
          {props.author.firstName}
        </span>
        {/*   <span className="bg-eeffcc rounded-md border border-ccf px-2 py-1 inline-block">
          {job}
        </span> */}
        <p className="text-xs uppercase tracking-wide font-normal text-gray-600">
          <MdDateRange className="inline-block mr-1" />
          {props.publishedAt?.toLocaleDateString("fr")}
        </p>
        <h3 className="font-bold text-2xl my-1">{props.title}</h3>
        <p
          dangerouslySetInnerHTML={{ __html: props.content }}
          className="line-clamp-3 text-gray-600 text-xl"
        />
      </div>
      <Link
        className="text-lg text-gray-600 my-5 block"
        href={`/blogs/${props.id}`}
        passHref
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
