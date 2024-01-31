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
    <div className="grid items-center grid-cols-[5%_95%]">
      <div className="flex items-center text-[#396EA5] gap-4"></div>
      <form
        className="flex items-center gap-8 rounded-full w-full border border-[#396EA5]  "
        onSubmit={(event) => sendChat(event)}
      >
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-2xl text-[#396EA5] cursor-pointer"
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        <input
          type="text"
          placeholder="Ecrivez votre message ici :"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-[90%] h-[60%] bg-transparent text-[#396EA5] border-none pl-4 text-xl focus:outline-none"
        />
        <button
          type="submit"
          className="py-1 px-8 lg:px-4 rounded-full flex justify-center items-center bg-[#396EA5] border-none"
        >
          <IoMdSend className="text-4xl lg:text-xl text-white" />
        </button>
      </form>
    </div>
  );
}
