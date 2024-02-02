import Image from "next/image";
import React from "react";
import logo from "/public/rafiki.jpg";
import { useStateContext } from "@/Contexts/ThemeContext";

export default function layout({ children }: any) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#396EA5]">
      <div className="brand flex flex-col items-center gap-4">
        <Image
          alt="logo"
          width={225}
          src={logo}
          className="object-contain mb-4"
        />
      </div>
      {children}
    </div>
  );
}
