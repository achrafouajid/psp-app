{
  /*import { Input } from "@nextui-org/react";
import { data } from "./Chat";
import { CiSearch } from "react-icons/ci";

export function Contacts({ contacts, changeChat, selected }: data) {
  return (
    <>
      {
        <div className="flex flex-col overflow-y-scroll cursor-pointer h-100 bg-[#FAFBFB]">
          <div className="flex flex-col items-center overflow-auto gap-2 p-2">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<CiSearch size={18} />}
              type="search"
            />
            {contacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`contact ${
                  selected?.id === contact.id
                    ? "bg-[#396EA5] text-white"
                    : "bg-white text-[#396EA5] hover:bg-[#D1D9E6]"
                } cursor-pointer w-3/4 p-1 flex gap-4 items-center transition duration-500 ease-in-out rounded-full border border-[#396EA5]`}
                onClick={() => changeChat(contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarId}`}
                    alt=""
                    className="h-12"
                  />
                </div>
                <div className="username">
                  <h3 className="text-[#396EA5]">
                    {contact.lastName} {contact.firstName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}*/
}
