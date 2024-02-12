"use server";
import generateOTP from "@/utils/genOTP";
import prisma from "../../prisma/client";
import sendMail from "@/app/api/smtp/sendEmail";

export default async function forgotPassword(email: string) {
  const otp = generateOTP(4);
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user) {
    // Generate OTP
    const otp = generateOTP(4);

    // Send OTP via email
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          otp: otp,
        },
      });
      sendMail({
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
      });
      console.log("OTP sent successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    // User does not exist
    throw new Error("User not found");
  }
}
