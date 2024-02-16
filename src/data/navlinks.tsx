"use client";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdCategory, MdOutlineCastForEducation } from "react-icons/md";
import { FiShoppingBag, FiEdit, FiPieChart, FiFileText } from "react-icons/fi";
import { BsKanban, BsBarChart } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { GrUserSettings } from "react-icons/gr";
import { UserRole } from "@prisma/client";
import { NavLinkProps } from "@/components/NavLink";
import { FaUserDoctor } from "react-icons/fa6";
import { TbHeartRateMonitor, TbSitemap } from "react-icons/tb";
import { useStateContext } from "@/Contexts/ThemeContext";
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
        icon: <TbHeartRateMonitor size={20} className="" />,
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
        icon: <GrUserSettings size={20} className="" />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin],
      },
      {
        title: "Gestion Régions",
        href: "/regions",
        icon: <TbSitemap size={20} className="" />,
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
        icon: <GrUserSettings size={20} className="" />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Créer Dossier Patient",
        href: "/add-patient",
        icon: <FiUserPlus size={20} className="" />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Demandes",
        href: "/requests",
        icon: <FiFileText size={20} className="" />,
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
        icon: <FaUserDoctor size={20} className="" />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Ajouter Médecin",
        href: "/add-doctors",
        icon: <FaUserDoctor size={20} className="" />,
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
        icon: <MdOutlineCastForEducation size={20} className="" />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Gestion",
        href: "/list-blogs",
        icon: <BsKanban size={20} className="" />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin, UserRole.Lab],
      },
      {
        title: "Rédaction",
        href: "/add-blog",
        icon: <FiEdit size={20} className="" />,
        activatedFor: [UserRole.Admin],
        visibleFor: [UserRole.Admin, UserRole.Lab],
      },
      {
        title: "Catégories",
        href: "/category",
        icon: <MdCategory size={20} className="" />,
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
        icon: <IoChatbubblesOutline size={20} className="" />,
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
        icon: <AiOutlineCalendar size={20} className="" />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Notes",
        href: "/notes",
        icon: <BsKanban size={20} className="" />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
    ],
  },
];
