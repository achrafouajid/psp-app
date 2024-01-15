import React from "react";

export default function OtpForm() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>
            On a envoyé un code a votre email :<br />
            ou******@gmail.com
          </p>
        </div>
      </div>
      <div>
        <form action="" method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-[#0c545c] text-lg bg-white focus:bg-gray-100 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-[#0c545c] text-lg bg-white focus:bg-gray-100 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-[#0c545c] text-lg bg-white focus:bg-gray-100 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-[#0c545c] text-lg bg-white focus:bg-gray-100 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-5 items-center">
                <button
                  type="submit"
                  className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
                >
                  Vérifier
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
