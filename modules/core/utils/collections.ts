import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { umi, signer } from "./connection";
import collectionMetaData from "../data/collection/collection.json";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";

type CollectionProps = {
  name: string;
};

export const createNewCollection = async () => {
  const collectionSigner = generateSigner(umi);
  try {
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
  } catch (error) {
    console.error("error creating new collection ", error);
  }
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
    return mintAddresses;
  } catch (error) {
    console.error("Error fetching Candy Machine:", error);
    return [];
  }
};
