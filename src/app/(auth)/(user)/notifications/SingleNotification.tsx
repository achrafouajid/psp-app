import React from "react";

export default function SingleNotification() {
  return (
    <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
      {/* First item content */}
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center">
          <img
            className="h-full w-full rounded-xl"
            src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft1.0fea34cca5aed6cad72b.png"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h5 className="text-base font-bold text-navy-700 dark:text-white">
            Colorful Heaven
          </h5>
          <p className="mt-1 text-sm font-normal text-gray-600">
            Mark Benjamin
          </p>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
        <div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 320 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
          </svg>
        </div>
        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
          <p> </p>
          0.4<p className="ml-1">ETH</p>
        </div>
        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
          <p>30s</p>
          <p className="ml-1">ago</p>
        </div>
      </div>
    </div>
  );
}
