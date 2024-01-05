import React from "react";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
export default function Logout() {
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center p-2 rounded-lg bg-[#9a86f3] border-none cursor-pointer"
    >
      <BiPowerOff className="text-xl text-[#ebe7ff]" />
    </button>
  );
}
