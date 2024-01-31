import React from "react";
export default function Welcome() {
  return (
    <div className="flex justify-center items-center flex-col text-white">
      <h1>
        Bienvenue à la messagerie interne Rafiki fi Ilaji !
        <span className="text-[#396EA5]"> {}</span>
      </h1>
      <h3>
        Veuillez sélectionner un contact pour démarrer la conversation . . .
      </h3>
    </div>
  );
}
