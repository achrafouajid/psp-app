import { data } from "./Chat";
import SingleContact from "./SingleContact";
import { ImFolderDownload } from "react-icons/im";

export function Contacts({ contacts, changeChat, selected }: data) {
  return (
    <>
      {
        <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
          <div className="flex justify-between items-center w-100 min-h-[55px] px-3 hover:bg-[#202d33]">
            <div className="flex justify-around items-center w-[150px]">
              <span className="text-emerald-500 text-lg">
                <ImFolderDownload />
              </span>

              {/* Archived */}
              <h1 className="text-white">Archived</h1>
            </div>
            <p className="text-emerald-500 text-xs font-light">7</p>
            <img src="doctordash.png" alt="logo" className="h-8" />
          </div>
          <div className="flex flex-col items-center overflow-auto gap-2 p-2">
            <SingleContact />
            {contacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`contact ${
                  selected?.id === contact.id ? "bg-[#9a86f3]" : "bg-[#157891]"
                } cursor-pointer w-[90%] rounded-sm p-1 flex gap-4 items-center transition duration-500 ease-in-out`}
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
                  <h3 className="text-white">{contact.lastName}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#f17c34] flex justify-center items-center gap-8 lg:gap-2">
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
          </div>
        </div>
      }
    </>
  );
}
