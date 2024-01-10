import React from "react";
import getAllUsers from "../../../../server/auth/getAllUsers";
import UsersData from "./UsersData";

export default async function page() {
  const data = await getAllUsers();
  return <UsersData data={data} />;
}
