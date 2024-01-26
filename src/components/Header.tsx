import React from "react";

const Header = ({ category, title }: any) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-[#396EA5]">
      {title}
    </p>
  </div>
);

export default Header;
