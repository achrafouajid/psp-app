"use server";
import prisma from "../../prisma/client";

export async function checkOTP(email: string, otp: string): Promise<boolean> {
  try {
    // Query the user from the database
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        otp: otp,
      },
    });
    if (user) {
      return true; // OTP is correct
    } else {
      return false; // OTP is incorrect
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
}
