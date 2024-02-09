import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import get_blogs from "../../server/blog/get_blogs";
import Image from "next/image";
import { FaExternalLinkAlt, FaTag } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";

export default function CardBlog(
  props: Awaited<ReturnType<typeof get_blogs>>[number]
) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={200}
          src={props.image.url ? "/" + props.image.url : "/noimage.png"}
          width={200}
          className="border rounded-t-2xl w-full object-fill"
        />
      </CardHeader>
      <Divider />
      <span className="ml-3 flex items-center gap-1">
        <FaUserPen style={{ color: "#396EA5" }} />
        {props.author.lastName} {props.author.firstName}
      </span>
      <p className="ml-3 flex items-center gap-1 uppercase tracking-wide font-normal text-gray-600">
        <MdDateRange style={{ color: "#396EA5" }} />
        {props.publishedAt?.toLocaleDateString("fr")}
      </p>
      {props.categories.map((category, index) => (
        <span key={index} className="ml-3 flex items-center gap-1">
          <FaTag style={{ color: "#396EA5" }} />
          <div
            style={{ backgroundColor: `${category.category.color}` }}
            className="flex px-2 py-1 rounded-full text-white justify-between"
          >
            {category.category.label}{" "}
          </div>
        </span>
      ))}
      <h3 className="font-bold text-2xl my-1 mx-3">{props.title}</h3>
      <Divider />
      <CardBody>
        <p
          dangerouslySetInnerHTML={{ __html: props.content }}
          className="line-clamp-3 text-gray-600 text-xl"
        />{" "}
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          href={`/blogs/${props.id}`}
          passHref
          className="flex items-center text-[#396EA5] gap-1"
        >
          <FaExternalLinkAlt />
          Continuer de lire ...
        </Link>
      </CardFooter>
    </Card>
  );
}