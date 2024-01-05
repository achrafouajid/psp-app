import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FiShoppingBag, FiEdit, FiPieChart } from "react-icons/fi";
import { BsKanban, BsBarChart } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiStockLine } from "react-icons/ri";

import { FiUserPlus } from "react-icons/fi";

import { GiLouvrePyramid } from "react-icons/gi";

import { GrUserSettings } from "react-icons/gr";
import { UserRole } from "@prisma/client";
import { NavLinkProps } from "@/components/NavLink";
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
        title: "Liste Patients",
        href: "/patients-list",
        icon: <IoMdContacts />,
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
    ],
  },
  {
    title: "MODULE EDUCATION PATIENT",
    links: [
      {
        title: "Module d'Éducation des Patients",
        href: "/blogs",
        icon: <AiOutlineCalendar />,
        activatedFor: [UserRole.Admin, UserRole.Nurse, UserRole.Patient],
        visibleFor: [
          UserRole.Admin,
          UserRole.Lab,
          UserRole.Nurse,
          UserRole.Patient,
        ],
      },
      {
        title: "Gestion",
        href: "/blogs-list",
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
        href: "/category-list",
        icon: <MdCategory />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin, UserRole.Lab],
      },
      {
        title: "Ajouter Catégorie",
        href: "/add-category",
        icon: <BiColorFill />,
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
        activatedFor: [UserRole.Admin, UserRole.Nurse, UserRole.Patient],
        visibleFor: [
          UserRole.Admin,
          UserRole.Lab,
          UserRole.Nurse,
          UserRole.Patient,
        ],
      },
      {
        title: "Rendez-vous",
        href: "/calendar",
        icon: <AiOutlineCalendar />,
        activatedFor: [UserRole.Admin, UserRole.Nurse, UserRole.Patient],
        visibleFor: [
          UserRole.Admin,
          UserRole.Lab,
          UserRole.Nurse,
          UserRole.Patient,
        ],
      },
      {
        title: "Notes",
        href: "/kanban",
        icon: <BsKanban />,
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
    ],
  },
  {
    title: "Charts",
    links: [
      {
        title: "Ligne",
        href: "/line",
        icon: <AiOutlineStock />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Zone",
        href: "/area",
        icon: <AiOutlineAreaChart />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },

      {
        title: "Barre",
        href: "/bar",
        icon: <AiOutlineBarChart />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Cercle",
        href: "/pie",
        icon: <FiPieChart />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Finance",
        href: "/financial",
        icon: <RiStockLine />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Couleurs",
        href: "color-mapping",
        icon: <BsBarChart />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Pyramides",
        href: "/pyramid",
        icon: <GiLouvrePyramid />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Pile",
        href: "/stacked",
        icon: <AiOutlineBarChart />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
    ],
  },
];
