import React, { useState, useEffect, useRef, Ref } from "react";
import { Socket, io } from "socket.io-client";
import getMessages from "../../../../server/chat/getMessages";
import { Message, User } from "@prisma/client";
import sendMessage from "../../../../server/chat/sendMessage";
import { useSession } from "@/Contexts/UserContext";
import ChatInput from "./ChatInput";
import Image from "next/image";

export default function ChatContainer({ currentUser }: { currentUser: User }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = useSession();
  const socket = useRef<Socket>();

  function onMessgae(msg: any) {
    console.log(msg);
    const msgs = [...messages];
    msgs.push(msg);
    setMessages(msgs);
  }

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("add-user", user.id);
    socket.current?.on("send_msg-" + user.id, (msg) => onMessgae(msg));
    return () => {
      socket.current?.off("send_msg-" + user.id, (msg) => onMessgae(msg));
    };
  }, []);
  async function getMessage() {
    const messages = await getMessages(currentUser.id);
    setMessages(messages);
  }

  useEffect(() => {
    getMessage();
  }, []);

  const handleSendMsg = async (msg: string) => {
    const message = await sendMessage({
      content: msg,
      receiverId: currentUser.id,
    });
    socket.current?.emit("send_msg" + currentUser.id, message);
    const msgs = [...messages];
    msgs.push(message);
    setMessages(msgs);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-[10%_80%_10%] lg:grid-rows-[15%_70%_15%] gap-0.5 overflow-hidden">
      <div className="flex justify-between items-center p-8">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <Image
              className="rounded-full h-12 w-12"
              src={user.avatar?.url ? "/" + user.avatar?.url : "/noavatar.png"}
              alt="user-avatar"
              width={200}
              height={200}
            />
          </div>
          <div className="username">
            <h3 className="text-[#396EA5]">
              {currentUser.lastName + " " + currentUser.firstName}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-auto p-8 bg-[#FAFBFB] border border-[#396EA5] rounded-l-3xl">
        {messages.map((message) => (
          <div
            ref={scrollRef}
            key={message.id}
            className={`flex shrink-0  ${
              message.senderId == user.id ? "self-end  " : "self-start "
            }`}
          >
            <div
              className={`max-w-[40%] min-w-fit shrink-0 lg:max-w-[70%] break-words p-4 text-lg rounded-lg text-[#396EA5] ${
                message.senderId == user.id
                  ? " bg-[#396EA5] text-white"
                  : " bg-white text-[#396EA5] border border-[#396EA5]"
              } `}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
