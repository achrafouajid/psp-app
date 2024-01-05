import { useStateContext } from "@/Contexts/ThemeContext";
import React from "react";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  onClick,
  type,
}: any) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type={type ?? "button"}
      onClick={async () => {
        if (onClick) await onClick();

        setIsClicked(initialState);
      }}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
