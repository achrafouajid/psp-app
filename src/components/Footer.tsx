import Image from "next/image";
import React from "react";
import logo from "public/mshealth.jpg";

const Footer = () => (
  <div className="mt-25 flex items-center flex-col">
    <Image
      alt="logo"
      width={300}
      height={50}
      src={logo}
      className="object-contain "
    />
    <p className="dark:text-gray-200 text-gray-700 text-center mt-5  ">
      MS Health © 2024 Tous droits réservés
    </p>
  </div>
);

export default Footer;
