import React from "react";
export default function Welcome() {
  return (
    <div className="flex justify-center items-center flex-col text-white">
      <h1>
        Welcome, <span className="text-[#f17c34]">userName!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
