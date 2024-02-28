export default function convertToDays(seconds: number) {
  // Convert seconds to days, rounding up to the nearest whole number
  const days = Math.ceil(seconds / 86400);

  return days;
}
