"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import Image from "next/image";
import { FaExternalLinkAlt, FaTag } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import getPublishedBlogs from "../../server/blog/get_published_Blogs";

export default function CardBlog(
  props: Awaited<ReturnType<typeof getPublishedBlogs>>[number]
) {
  const html = document.createElement("div");
  html.innerHTML = props.content;

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
          <Chip
            size="sm"
            style={{ backgroundColor: category.category.color, color: "white" }}
          >
            {category.category.label}
          </Chip>
        </span>
      ))}
      <h3 className="font-bold text-2xl my-1 mx-3">{props.title}</h3>
      <Divider />
      <CardBody>
        <p className="line-clamp-3 font-light text-sm ">{html.textContent}</p>
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
