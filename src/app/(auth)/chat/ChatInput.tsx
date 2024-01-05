import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker, { EmojiClickData } from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }: any) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event: any) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid items-center grid-cols-[5%_95%] bg-[#157891] p-8 lg:p-4 lg:gap-4">
      <div className="flex items-center text-white gap-4">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-2xl text-[#ffff00c8] cursor-pointer"
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="flex items-center gap-8 bg-[#ffffff34] rounded-full w-full"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-[90%] h-[60%] bg-transparent text-white border-none pl-4 text-xl focus:outline-none"
        />
        <button
          type="submit"
          className="py-1 px-8 lg:px-4 rounded-full flex justify-center items-center bg-[#f17c34] border-none"
        >
          <IoMdSend className="text-4xl lg:text-xl text-white" />
        </button>
      </form>
    </div>
  );
}
