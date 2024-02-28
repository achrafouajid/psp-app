"use server";
export default async function convertSecondsToDaysHoursMinutes(
  seconds: number
) {
  // Convert seconds to days, hours, and minutes
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Format the output
  let formattedTime = "";
  if (days > 0) {
    formattedTime += `${days} day(s) `;
  }
  if (hours > 0) {
    formattedTime += `${hours} hour(s) `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes} minute(s) `;
  }
  if (seconds > 0) {
    formattedTime += `${seconds} second(s)`;
  }

  return formattedTime.trim();
}
