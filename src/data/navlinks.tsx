"use client";
import React from "react";

import { UserRole } from "@prisma/client";
import { NavLinkProps } from "@/components/NavLink";
import dynamic from "next/dynamic";
const BsKanban = dynamic(
  () => import("react-icons/bs").then((e) => e.BsKanban),
  { ssr: false }
);
const AiOutlineCalendar = dynamic(
  () => import("react-icons/ai").then((e) => e.AiOutlineCalendar),
  { ssr: false }
);
const IoChatbubblesOutline = dynamic(
  () => import("react-icons/io5").then((e) => e.IoChatbubblesOutline),
  { ssr: false }
);

const IoMailOutline = dynamic(
  () => import("react-icons/io5").then((e) => e.IoMailOutline),
  { ssr: false }
);
const MdCategory = dynamic(
  () => import("react-icons/md").then((e) => e.MdCategory),
  { ssr: false }
);
const MdOutlineCastForEducation = dynamic(
  () => import("react-icons/md").then((e) => e.MdOutlineCastForEducation),
  { ssr: false }
);
const FiEdit = dynamic(() => import("react-icons/fi").then((e) => e.FiEdit), {
  ssr: false,
});
const FiFileText = dynamic(
  () => import("react-icons/fi").then((e) => e.FiFileText),
  { ssr: false }
);
const FiUserPlus = dynamic(
  () => import("react-icons/fi").then((e) => e.FiUserPlus),
  { ssr: false }
);
const GrUserSettings = dynamic(
  () => import("react-icons/gr").then((e) => e.GrUserSettings),
  { ssr: false }
);
const TbHeartRateMonitor = dynamic(
  () => import("react-icons/tb").then((e) => e.TbHeartRateMonitor),
  { ssr: false }
);
const FaUserDoctor = dynamic(
  () => import("react-icons/fa6").then((e) => e.FaUserDoctor),
  { ssr: false }
);
const TbSitemap = dynamic(
  () => import("react-icons/tb").then((e) => e.TbSitemap),
  { ssr: false }
);

const TbCalendarTime = dynamic(
  () => import("react-icons/tb").then((e) => e.TbCalendarTime),
  { ssr: false }
);
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
        icon: <TbHeartRateMonitor />,
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
        icon: <MdOutlineCastForEducation />,
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
        activatedFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Courrier",
        href: "/email",
        icon: <IoMailOutline />,
        activatedFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
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
        title: "Calendrier",
        href: "/calendar",
        icon: <AiOutlineCalendar />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
      {
        title: "Liste des Rendez-vous",
        href: "/list-appointments",
        icon: <TbCalendarTime />,
        activatedFor: [UserRole.Admin, UserRole.Nurse],
        visibleFor: [UserRole.Admin, UserRole.Lab, UserRole.Nurse],
      },
    ],
  },
];
