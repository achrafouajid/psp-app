import { routes } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { PiFiles } from "react-icons/pi";

export const gridProfile = (props: any) =>
  props.avatar ? (
    <img className="rounded-full w-10 h-10" src={props.avatar} alt="employee" />
  ) : (
    <div className="rounded-full w-10 h-10"></div>
  );
