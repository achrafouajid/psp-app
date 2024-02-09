export default function generateRandomPassword(length: number): string {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()";
  let result = "";

  // Ensure at least one character from each set is included
  result += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  result += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  result += numberChars[Math.floor(Math.random() * numberChars.length)];
  result += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password with random characters from all sets
  for (let i = 4; i < length; i++) {
    const allChars =
      upperCaseChars + lowerCaseChars + numberChars + specialChars;
    result += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password characters to ensure randomness
  result = result
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return result;
}
