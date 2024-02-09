import React, { MouseEvent, useEffect, useId } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "@/Contexts/ThemeContext";
import Button from "./Button";
import logout from "../../server/auth/logout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/Contexts/UserContext";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { IoMailUnreadSharp } from "react-icons/io5";
import { FiCreditCard } from "react-icons/fi";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { setIsClicked, initialState, isClicked } = useStateContext();

  const router = useRouter();
  const user = useSession();
  const id = "profile";
  useEffect(() => {
    function onClick(params: globalThis.MouseEvent) {
      console.log(params);
      if ((params.target as Element).closest(`#${id}`)) return;
      else setIsClicked(initialState);
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div id={id} className="">
      {isClicked.userProfile && (
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
              src={user.avatar?.url ? "/" + user.avatar?.url : "/noavatar.png"}
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
            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
              <Link
                style={{
                  color: currentColor,
                  backgroundColor: "white",
                }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                href={`/${user.id}`}
              >
                <FaUser />
              </Link>

              <div>
                <p className="font-semibold dark:text-gray-200 ">Mon Profil</p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Paramètres
                </p>
              </div>
            </div>
            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
              <Link
                style={{
                  color: currentColor,
                  backgroundColor: "white",
                }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                href={`/${user.id}/notifications`}
              >
                <IoMailUnreadSharp />
              </Link>

              <div>
                <p className="font-semibold dark:text-gray-200 ">
                  Ma messagerie
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Messages & Emails
                </p>
              </div>
            </div>
            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
              <Link
                style={{
                  color: currentColor,
                  backgroundColor: "white",
                }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                href="/calendar"
              >
                <FiCreditCard />
              </Link>

              <div>
                <p className="font-semibold dark:text-gray-200 ">Mon Espace</p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Tâches
                </p>
              </div>
            </div>
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
      )}
    </div>
  );
};

export default UserProfile;
