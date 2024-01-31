import { data } from "./Chat";

export function Contacts({ contacts, changeChat, selected }: data) {
  return (
    <>
      {
        <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
          <div className="flex flex-col items-center overflow-auto gap-2 p-2">
            {contacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`contact ${
                  selected?.id === contact.id
                    ? "bg-[#396EA5] text-white"
                    : "bg-[#D1D9E6] text-[#396EA5]"
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
          {/*
          <div className="flex justify-center items-center gap-8 lg:gap-2 rounded-full border border-[#396EA5]">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${selected?.avatarId}`}
                alt="avatar"
                className="h-16 max-w-full"
              />
            </div>
            <div className="username">
              <h2 className="text-white lg:text-lg">{selected?.lastName}</h2>
            </div>
          </div>*/}
        </div>
      }
    </>
  );
}
