"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { createcNFTs, fetchCollection } from "@/modules/core/utils";

const Transfer = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [nfts, setNFTs] = useState<string[]>([]);
  const [metaData, setMetaData] = useState<any>(null);

  const handleMint = async () => {
    await createcNFTs(recipientAddress);
    setMetaData(null);
  };

  useEffect(() => {
    async function getNFTs() {
      // getCandyMachine();
      const nfts = await fetchCollection();
      setNFTs(nfts);
    }
    getNFTs();
  }, [metaData]);
  return (
    <div className="flex justify-around items-center min-h-screen home">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Collect Your NFT Pass</h2>
        <h2 className="text-3xl font-bold">{nfts.length}/1000</h2>
        {/* {true && (
          <>
            <div className="text-primary font-medium">
              0xDsaff221fdfcdsaf2e2fdds....
            </div>
            <div className="flex gap-4">
              <div className="bg-primary py-3 px-4 rounded-2xl cursor-pointer">
                Back to Home
              </div>
              <a
                href="https://explorer.solana.com/address/CbTQfRcYxmJp4cNQ1Gj7qTNjoNpySyE9ry5safWqWfbD?cluster=devnet"
                target="_blank"
                className="text-primary border border-primary py-3 px-4 rounded-2xl cursor-pointer"
              >
                View NFT
              </a>
            </div>
          </>
        )} */}
        <Input
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Enter your Solana Address"
          className="border border-primary  p-4 shadow-[0px_0px_80.2px_-5px_rgba(119,91,187,0.73)]"
        />
        <div className="max-w-72">
          If you do not have a Solana wallet, create one now.
          <a
            href="https://phantom.app/"
            target="_blank"
            className="text-primary"
            rel="noopener noreferrer"
          >
            Create Wallet
          </a>
        </div>
        <Button
          onClick={handleMint}
          className="solana-brand-bg font-medium text-white py-4 px-9 rounded-[32px]"
        >
          Claim NFT
        </Button>
        {/* <div className="w-full h-1 my-8 bg-white" />
        <Input
          accept="image/png, image/jpeg"
          multiple={false}
          type="file"
          onChange={(e) =>
            e.target.files ? handleImgInput(e.target.files[0]) : null
          }
        />
        <Button>upload to Ipfts</Button>

        <Input
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter Collection Name"
          className="border border-primary  p-4 shadow-[0px_0px_80.2px_-5px_rgba(119,91,187,0.73)]"
        />
        <Input
          accept="image/png, image/jpeg"
          multiple={false}
          type="file"
          onChange={(e) =>
            e.target.files ? setCollectionImg(e.target.files[0]) : null
          }
        />
        <Button
          onClick={() =>
            collectionImg
              ? createNewCollecton({ collectionName, collectionImg })
              : {}
          }
        >
          Create Collection
        </Button> */}
      </div>
      <Image src="/nft.png" width={500} height={500} alt="test-nft" />
      {/* <div className="flex flex-col gap-4">
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
      </div> */}
    </div>
  );
};

export default Transfer;
