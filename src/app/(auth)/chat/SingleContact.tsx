import React from "react";

function SingleContact() {
  return (
    // Chat container
    <div className="flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33] bg-[#202d33]">
      {/* Profile picture */}
      <img
        src=""
        alt="profile_picture"
        className="rounded-full w-[50px] mr-5"
      />

      {/* Info container */}
      <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
        {/* Contact name and message */}
        <div className="flex flex-col justify-between text-white">
          {/* Contact name */}
          <h1 className="font-medium mb-1">user</h1>

          {/* Message */}
          <p className="text-neutral-400 text-sm">msg</p>
        </div>

        {/* Time and number of messages*/}
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          {/* Time */}
          <p className="text-emerald-500 min-w-[55px]">12:00</p>

          {/* Number of messages */}

          <div className="flex justify-center items-center bg-emerald-500 rounded-full w-[20px] h-[20px]">
            <p className="text-emerald-900">2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleContact;
