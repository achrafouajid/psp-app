import { useStateContext } from "@/Contexts/ThemeContext";
import { useSession } from "@/Contexts/UserContext";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { MdLockOutline } from "react-icons/md";

export type NavLinkProps = {
  title: string;
  href: string;
  icon: ReactNode;
  activatedFor: UserRole[];
  visibleFor: UserRole[];
};

export default function NavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const user = useSession();
  const active = pathname.startsWith(props.href);
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  if (!props.visibleFor.includes(user.role)) return null;

  if (props.activatedFor.includes(user.role))
    return (
      <Link
        href={"." + `${props.href}`}
        onClick={handleCloseSideBar}
        style={{
          backgroundColor: active ? currentColor : "",
        }}
        className={active ? "activeLink" : "normalLink"}
      >
        {props.icon}
        <span className="">{props.title}</span>
      </Link>
    );
  return (
    <div
      style={{
        backgroundColor: active ? currentColor : "",
      }}
      className={"!text-gray-500 ".concat(active ? "activeLink" : "normalLink")}
    >
      {props.icon}
      <span className="">{props.title}</span>
      <MdLockOutline />
    </div>
  );
}
