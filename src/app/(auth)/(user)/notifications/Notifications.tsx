import React from "react";
import SingleNotification from "./SingleNotification";

const Notifications: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center  pt-4">
      <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-3/4 mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
          <div className="text-lg font-bold text-navy-700 dark:text-white">
            Notifications
          </div>
          <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
            Tout voir
          </button>
          <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
            Tout effacer
          </button>
        </div>
        <SingleNotification />
        <SingleNotification />
        <SingleNotification />
      </div>
    </div>
  );
};

export default Notifications;
