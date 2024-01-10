import React from "react";
import LeftMenu from "./LeftMenu";
import ChatDetail from "./ChatDetail";

function WhatsApp() {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        {/* 2 components cointainer */}
        <div className="flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
          {/* LeftMenu */}
          <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
            <LeftMenu />
          </div>

          {/* ChatDetail */}
          <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
            <ChatDetail />
          </div>
        </div>
      </div>
    </>
  );
}

export default WhatsApp;
