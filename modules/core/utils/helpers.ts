export function generateNFTName(
  currentNumber: number,
  total: number,
  nameFormat: string
) {
  const maxLength = total.toString().length;
  const paddedNumber = currentNumber.toString().padStart(maxLength, "0");
  const nftName = `${nameFormat} #${paddedNumber}`;
  return nftName;
}
