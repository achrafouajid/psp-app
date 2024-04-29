"use server";
import { MailStatusEnum } from "@prisma/client";
import prisma from "../../prisma/client";
import currentUser from "../auth/currentUser";

type req =
  | "received"
  | "sent"
  | "draft"
  | "flagged"
  | "deleted"
  | "all"
  | "attachments";

type WhereCondition = {
  receiverId?: string;
  senderId?: string;
  status?: MailStatusEnum | null;
  hasAttachments?: boolean;
};

export async function FilterMails(req: req) {
  var user = await currentUser();

  const baseQuery = {
    select: {
      receiver: true,
      sender: true,
      sentDate: true,
      subject: true,
      id: true,
      body: true,
    },
    where: {} as WhereCondition,
  };

  // Adjust the query based on the request type
  switch (req) {
    case "received":
      baseQuery.where.receiverId = user?.id;
      break;
    case "sent":
      baseQuery.where.senderId = user?.id;
      break;
    case "draft":
      baseQuery.where.status = MailStatusEnum.Draft; // Use the enum value for draft
      break;
    case "flagged":
      baseQuery.where.status = MailStatusEnum.Flagged; // Use the enum value for draft
      break;
    case "deleted":
      baseQuery.where.status = MailStatusEnum.Deleted; // Use the enum value for draft
      break;
    case "all":
      // No additional conditions needed for all emails
      break;
    case "attachments":
      // Add conditions for emails with attachments
      break;
    default:
      throw new Error(`Unsupported request type: ${req}`);
  }

  // Execute the query
  return prisma.mail.findMany(baseQuery);
}
