export default function generateOTP(length: number): string {
  const numberChars = "0123456789";

  let result = "";

  // Ensure at least one character from each set is included

  result += numberChars[Math.floor(Math.random() * numberChars.length)];

  // Fill the rest of the password with random characters from all sets
  for (let i = 1; i < length; i++) {
    result += numberChars[Math.floor(Math.random() * numberChars.length)];
  }

  // Shuffle the password characters to ensure randomness
  result = result
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return result;
}
