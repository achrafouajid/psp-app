export default async function convertToDays(seconds: number) {
  // Convert seconds to days, hours, and minutes
  const days = (seconds / 86400).toFixed(2);
  seconds %= 86400;

  return days;
}
