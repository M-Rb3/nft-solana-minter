import bs58 from "bs58";
import { connection } from "./connection";

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

export async function getTransactionDetails(signature: Uint8Array) {
  try {
    // Convert the Uint8Array signature to a Base58 string
    const signatureBase58 = bs58.encode(signature);
    // Fetch the transaction details
    const transaction = await connection.getParsedTransaction(signatureBase58);

    if (transaction) {
      console.log("Transaction Details:", transaction);
    } else {
      console.log("Transaction not found or not finalized yet.");
    }
  } catch (error) {
    console.error("Error fetching transaction details:", error);
  }
}
