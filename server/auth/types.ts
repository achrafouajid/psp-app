import { UserRole } from "@prisma/client";

export enum registerResponseEnum {
  success,
  exist,
}
export type JwtPayload = {
  userId: string;
  fullName: string;
  role: UserRole;
};
