import prisma from "../../prisma/client";

export async function checkOTP(userId: string, otp: string): Promise<boolean> {
  try {
    // Query the user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If the user exists and the OTP matches
    if (user && user.otp === otp) {
      // Clear the OTP after successful verification
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          otp: null, // Clear the OTP field
        },
      });
      return true; // OTP is correct
    } else {
      return false; // OTP is incorrect
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
}
