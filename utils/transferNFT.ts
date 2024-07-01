import { Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import { fetchMintAddresses } from "./fetchMintAddresses";

const connection = new Connection(
  process.env.NEXT_PUBLIC_RPC_URL!,
  "confirmed"
);

const getRandomNftMintAddress = async (): Promise<string> => {
  const nftMintAddresses = await fetchMintAddresses(
    "HYXSHULhGEbkpPZUBHygcZD8Efg6JsgUV7ch64QdrkcQ"
  );
  console.log("nftMintAddresses", nftMintAddresses);

  const randomIndex = Math.floor(Math.random() * nftMintAddresses.length);
  return nftMintAddresses[randomIndex];
};

export async function transferNFT(recipientAddress: string): Promise<string> {
  try {
    const senderSecretKey = Uint8Array.from(
      process.env
        .NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",")
        .map((val) => Number(val))
    );
    const senderWallet = Keypair.fromSecretKey(senderSecretKey);

    const recipientPublicKey = new PublicKey(recipientAddress);
    const mintAddress = await getRandomNftMintAddress();

    const mintPublicKey = new PublicKey(mintAddress);

    // Get the associated token account of the sender for the given NFT mint address
    const senderTokenAccount = await getAssociatedTokenAddress(
      mintPublicKey,
      senderWallet.publicKey
    );

    // Get or create the associated token account of the recipient for the given NFT mint address
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet, // Payer's Signer
      mintPublicKey,
      recipientPublicKey
    );

    // Create a transaction to transfer the NFT
    const transaction = new Transaction().add(
      createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount.address,
        senderWallet.publicKey,
        1
      )
    );

    // Sign and send the transaction
    const signature = await connection.sendTransaction(transaction, [
      senderWallet,
    ]);
    return signature;
  } catch (error) {
    console.error("Error transferring NFT:", error);
    throw error;
  }
}
