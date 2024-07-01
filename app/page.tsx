"use client";
import { useState } from "react";
import { transferNFT } from "../utils/transferNFT";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCoreNfts } from "@/utils/createCoreNfts";
import {
  GenericFile,
  createGenericFileFromBrowserFile,
} from "@metaplex-foundation/umi";
import {
  createMerckleTree,
  createNewCollecton,
} from "@/utils/compressedNftsGenerator";
import { createTree } from "@/utils/createCompressedNfts";

const Transfer = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transactionSignature, setTransactionSignature] = useState("");
  const [error, setError] = useState("");
  const [imgFile, setImgFile] = useState<null | GenericFile>(null);

  const handleTransfer = async () => {
    try {
      console.log(
        "process.env.NEXT_PUBLIC_RPC_URL",
        process.env.NEXT_PUBLIC_RPC_URL
      );

      setError("");
      const signature = await transferNFT(recipientAddress);
      setTransactionSignature(signature);
    } catch (err) {
      setError("Failed to transfer NFT: " + (err as Error).message);
    }
  };

  const handleImgInput = async (imgFile: File) => {
    if (imgFile) {
      const img = await createGenericFileFromBrowserFile(imgFile);
      setImgFile(img);
    }
  };

  const handleMint = async () => {
    const response = await fetch("/api", {
      headers: {
        method: "GET",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4">
        <h1>Transfer NFT</h1>
        <Input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
        <Button onClick={handleTransfer}>Transfer NFT</Button>
        {transactionSignature && (
          <p>Transaction Signature: {transactionSignature}</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="w-full h-1 my-4" />
        <Input
          accept="image/png, image/jpeg"
          multiple={false}
          type="file"
          onChange={(e) =>
            e.target.files ? handleImgInput(e.target.files[0]) : null
          }
        />
        <Button
          onClick={() => (imgFile ? createCoreNfts(imgFile) : null)}
          disabled={!imgFile}
        >
          Mint NFT
        </Button>
        <Button onClick={createNewCollecton}>Create CNFT</Button>
      </div>
    </div>
  );
};

export default Transfer;
