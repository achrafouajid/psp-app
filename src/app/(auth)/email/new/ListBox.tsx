"use client";
import {
  Avatar,
  Button,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Selection,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { getAllUserswithcurrent } from "../../../../../server/auth/getAllUsers";

const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
export default function ListBox({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getAllUserswithcurrent>>>;
}) {
  const users = data;
  const [showListbox, setShowListbox] = useState(false);
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const [inputValue, setInputValue] = useState(""); // State for the input field's value
  const arrayValues = Array.from(values);
  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => {
          // Find the user object by email
          const user = users.find((user) => user.email === value);
          // Check if the user object exists before trying to access its properties
          return user ? (
            <Chip key={value}>{user.lastName + " " + user.firstName}</Chip>
          ) : null;
        })}
      </ScrollShadow>
    );
  }, [arrayValues, users]);
  // Update the input value based on the current selection
  const handleSelectionChange = (newValues: Selection) => {
    setValues(newValues);
    const selectedEmails = Array.from(newValues).join(", ");
    setInputValue(selectedEmails);
  };
  return (
    <>
      <div className="relative flex flex-col space-y-2">
        <label
          className="absolute left-3 top-4 text-gray-500 dark:text-gray-400"
          htmlFor="subject"
        >
          à:
        </label>
        <div className="flex items-center w-full">
          <div className="flex gap-2 items-center">
            {arrayValues.map((value) => {
              const user = users.find((user) => user.email === value);
              return user ? (
                <Tooltip content={user?.email}>
                  <Chip
                    key={value}
                    onClose={() =>
                      setValues(new Set(arrayValues.filter((v) => v !== value)))
                    }
                  >
                    {user.lastName + " " + user.firstName}
                  </Chip>
                </Tooltip>
              ) : null;
            })}
          </div>
          <input
            className="flex-grow border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none h-9"
            id="subject"
            name="email"
            type="email"
            required
            value={inputValue} // Bind the input value state to the input field
            onChange={(e) => setInputValue(e.target.value)}
            style={{ color: "transparent", backgroundColor: "white" }} // Hide the input value visually
          />
          <Button
            className="ml-2"
            isIconOnly
            onClick={() => setShowListbox(!showListbox)}
          >
            +
          </Button>
        </div>
      </div>

      {showListbox && (
        <ListboxWrapper>
          <Listbox
            topContent={topContent}
            classNames={{
              base: "max-w-xs",
              list: "max-h-[300px] overflow-scroll",
            }}
            defaultSelectedKeys={[]}
            items={users}
            selectedKeys={values}
            label="Assigned to"
            selectionMode="multiple"
            onSelectionChange={handleSelectionChange} // Use the custom handler
            variant="flat"
          >
            {(item) => (
              <ListboxItem
                key={item.email} // Use email as the key
                textValue={item.email} // Use email as the textValue
              >
                <div className="flex gap-2 items-center">
                  {item.avatar ? (
                    <Avatar
                      alt={item.firstName + " " + item.lastName}
                      className="flex-shrink-0"
                      size="sm"
                      src={`${item.avatar?.url}`}
                    />
                  ) : (
                    <Avatar
                      name={item.firstName + " " + item.lastName}
                      className="flex-shrink-0"
                      size="sm"
                      color="primary" // Assuming a default color for the avatar if no image is provided
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-small">
                      {item.firstName + " " + item.lastName}
                    </span>
                    <span className="text-tiny text-default-400">
                      {item.email}
                    </span>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      )}
    </>
  );
}
