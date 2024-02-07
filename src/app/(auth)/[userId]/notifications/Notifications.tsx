import React from "react";
import SingleNotification from "./SingleNotification";

const Notifications: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
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
    </>
  );
};

export default Notifications;
