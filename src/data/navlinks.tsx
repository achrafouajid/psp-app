import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FiShoppingBag, FiEdit, FiPieChart, FiFileText } from "react-icons/fi";
import { BsKanban, BsBarChart } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiStockLine } from "react-icons/ri";

import { FiUserPlus } from "react-icons/fi";
import { GiLouvrePyramid } from "react-icons/gi";

import { GrUserSettings } from "react-icons/gr";
import { UserRole } from "@prisma/client";
import { NavLinkProps } from "@/components/NavLink";
import { FaUserDoctor } from "react-icons/fa6";
import { TbSitemap } from "react-icons/tb";
type LinksGroup = {
  title: string;
  links: NavLinkProps[];
};

export const links: LinksGroup[] = [
  {
    title: "Dashboard",
    links: [
      {
        title: "Tableau de Bord",
        href: "/home",
        icon: <FiShoppingBag />,
        activatedFor: [
          UserRole.Admin,
          UserRole.Lab,
          UserRole.Nurse,
          UserRole.Patient,
        ],
        visibleFor: [
          UserRole.Admin,
          UserRole.Lab,
          UserRole.Nurse,
          UserRole.Patient,
        ],
      },

      {
        title: "Gestion Utilisateurs",
        href: "/users",
        icon: <GrUserSettings />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Gestion Régions",
        href: "/regions",
        icon: <TbSitemap />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
    ],
  },

  {
    title: "Patients",
    links: [
      {
        title: "Gestion Patients",
        href: "/patients",
        icon: <GrUserSettings />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Créer Dossier Patient",
        href: "/add-patient",
        icon: <FiUserPlus />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Demandes",
        href: "/requests",
        icon: <FiFileText />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
    ],
  },
  {
    title: "Médecins",
    links: [
      {
        title: "Classification Médecins",
        href: "/doctors",
        icon: <FaUserDoctor />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Ajouter Médecin",
        href: "/add-doctors",
        icon: <FaUserDoctor />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
    ],
  },
  {
    title: "MODULE EDUCATION PATIENT",
    links: [
      {
        title: "Module d'Éducation des Patients",
        href: "/blogs",
        icon: <AiOutlineCalendar />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Gestion",
        href: "/list-blogs",
        icon: <BsKanban />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin, UserRole.Lab],
      },
      {
        title: "Rédaction",
        href: "/add-blog",
        icon: <FiEdit />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin, UserRole.Lab],
      },
      {
        title: "Catégories",
        href: "/category",
        icon: <MdCategory />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin, UserRole.Lab],
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        title: "Messagerie",
        href: "/chat",
        icon: <IoChatbubblesOutline />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      /*  {
        title: "Whatsapp",
        href: "/whatsapp",
        icon: <IoChatbubblesOutline />,
        activatedFor: [UserRole.Admin, UserRole.Nurse, 
        visibleFor: [
          UserRole.Admin,
          UserRole.Nurse,
   
        ],
      },*/
      {
        title: "Rendez-vous",
        href: "/calendar",
        icon: <AiOutlineCalendar />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Notes",
        href: "/notes",
        icon: <BsKanban />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
    ],
  },
];
