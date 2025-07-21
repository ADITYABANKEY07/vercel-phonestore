/**
 * Converts INR (rupees) to paise for Razorpay (multiplies by 100).
 * @param {number} amountInRupees - The amount in rupees.
 * @returns {number} - The amount in paise.
 */
export function convertToPaise(amountInRupees) {
  if (!amountInRupees || isNaN(amountInRupees)) {
    throw new Error("Invalid amount passed to convertToPaise");
  }

  return Math.round(amountInRupees * 100); // Ensure no float errors
}

export default convertToPaise;
