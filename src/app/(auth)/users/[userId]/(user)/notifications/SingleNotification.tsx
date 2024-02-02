import Image from "next/image";
import React from "react";

export default function SingleNotification() {
  return (
    <div className="flex w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:text-gray-200 xl:col-span-2 dark:bg-secondary-dark bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center">
          <Image
            className="h-full w-full rounded-xl"
            src="/rafiki.jpg"
            alt="rafiki"
            width={1000}
            height={1000}
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
        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
          <p>30s</p>
          <p className="ml-1">ago</p>
        </div>
      </div>
    </div>
  );
}
