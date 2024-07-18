import { createCollection } from "@metaplex-foundation/mpl-core";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { umi, signer } from "./connection";
import collectionMetaData from "@/public/collection/collection.json";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";

type CollectionProps = {
  name: string;
};

export const createNewCollection = async () => {
  console.log("test");
  const collectionSigner = generateSigner(umi);

  // upload collection metadata to IPFS using Irys
  // Irys cost calculator
  // https://docs.irys.xyz/overview/cost-to-upload#price-calculator
  const uri = await umi.uploader.uploadJson(collectionMetaData);

  // create a Collection NFT
  const res = await createNft(umi, {
    mint: collectionSigner,
    authority: signer,
    name: "RAK DAO conference",
    symbol: "RKD",
    uri,
    sellerFeeBasisPoints: percentAmount(10, 2),
    isCollection: true,
  }).sendAndConfirm(umi);
  return {
    response: res,
    collectionAddress: collectionSigner.publicKey,
  };
};

export const fetchCollection = async (
  collectionAddress: string = process.env.NEXT_PUBLIC_COLLECTION_ID!
) => {
  try {
    const assets = await umi.rpc.getAssetsByGroup({
      groupKey: "collection",
      groupValue: collectionAddress,
    });

    const mintAddresses = assets.items.map(({ id }) => id);
    console.log("mintAddresses", mintAddresses);

    return mintAddresses;
  } catch (error) {
    console.error("Error fetching Candy Machine:", error);
    return [];
  }
};
