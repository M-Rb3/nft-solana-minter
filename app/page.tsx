"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { createcNFTs, fetchCollection } from "@/modules/core/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../components/ui/dropdown-menu";

const Transfer = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [nfts, setNFTs] = useState<string[]>([]);
  const [trxHash, setTrxHash] = useState("");
  const [position, setPosition] = useState("bottom");

  const handleMint = async () => {
    const trxHash = await createcNFTs(recipientAddress);
    // setTrxHash(trxHash);
  };

  useEffect(() => {
    async function getNFTs() {
      const nfts = await fetchCollection();
      setNFTs(nfts);
    }
    getNFTs();
  }, [trxHash]);
  return (
    <div className="flex justify-around items-center min-h-screen home">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Collect Your NFT Pass</h2>
        <h2 className="text-3xl font-bold">{nfts.length}/1000</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full" asChild>
            <Button variant="outline">Ticket option</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
        {trxHash && (
          <a
            href={`https://explorer.solana.com/tx/${trxHash}?cluster=devnet`}
            target="_blank"
          >
            {trxHash.slice(0, 25) + "..."}
          </a>
        )}
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
      </div>
      <Image src="/nft.png" width={500} height={500} alt="test-nft" />
    </div>
  );
};

export default Transfer;
