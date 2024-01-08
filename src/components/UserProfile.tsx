import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { userProfileData } from "../data/profiledata";
import { useStateContext } from "@/Contexts/ThemeContext";
import Button from "./Button";
import logout from "../../server/auth/logout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/Contexts/UserContext";
import Image from "next/image";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const router = useRouter();
  const user = useSession();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Profil Utilisateur
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <Image
          className="rounded-full h-24 w-24"
          src=""
          alt="user-avatar"
          width={200}
          height={200}
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {user.lastName} {user.firstName}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <Link
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              href={item.link}
            >
              {item.icon}
            </Link>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          onClick={(e) => logout()}
          color="white"
          bgColor={currentColor}
          text="Déconnexion"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
