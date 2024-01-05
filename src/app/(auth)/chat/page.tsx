import React from "react";

import getAllUsers from "../../../../server/auth/getAllUsers";
import Chat from "./Chat";

export default async function page() {
  const users = await getAllUsers();

  return <Chat contacts={users} />;
}
