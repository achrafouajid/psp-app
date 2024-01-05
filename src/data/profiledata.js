import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from "react-icons/bs";
import { IoMailUnreadSharp } from "react-icons/io5";

import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import { FaUser } from "react-icons/fa";

export const userProfileData = [
  {
    icon: <FaUser />,
    title: "Mon Profil",
    desc: "Paramètres",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    link: "/settings",
  },
  {
    icon: <IoMailUnreadSharp />,
    title: "Ma messagerie",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    link: "/notifications",
  },
  {
    icon: <FiCreditCard />,
    title: "Mon Espace",
    desc: "Tâches",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    link: "/calendar",
  },
];
