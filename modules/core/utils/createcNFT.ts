import { publicKey } from "@metaplex-foundation/umi";
import { mintToCollectionV1 } from "@metaplex-foundation/mpl-bubblegum";
import { umi } from "./connection";
import bs58 from "bs58";
import digitalexplorer from "../data/tickets/digitalexplorer.json";
import { fetchCollection } from "./collections";
import { generateNFTName } from "./helpers";

const collectionDevnetMint = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!);

const merkleTreeDevnetAddress = publicKey(
  process.env.NEXT_PUBLIC_MERKLE_TREE_ADDRESS!
);

export const createcNFTs = async (recipientAddress: string) => {
  // Fetch the collection NFTs count
  const collectionLength = (
    await fetchCollection(process.env.NEXT_PUBLIC_COLLECTION_ID!)
  ).length;
  let nftMetadata = digitalexplorer;
  // const name = generateNFTName(collectionLength, 1000, nftMetadata.name);
  nftMetadata.name = "Ultimate Experince";
  //   customer wallet adderss
  const recipientPubKey = publicKey(recipientAddress);

  // //   generate NFT metadata and upload it
  const uri = await umi.uploader.uploadJson(nftMetadata);
  console.log("uri", uri);

  // const { signature } = await mintToCollectionV1(umi, {
  //   leafOwner: recipientPubKey, // cNFT owner
  //   merkleTree: merkleTreeDevnetAddress,
  //   collectionMint: collectionDevnetMint,
  //   metadata: {
  //     name: nftMetadata.name,
  //     symbol: nftMetadata.symbol,
  //     uri: uri,
  //     sellerFeeBasisPoints: nftMetadata.seller_fee_basis_points,
  //     collection: { key: collectionDevnetMint, verified: true },
  //     creators: [
  //       { address: umi.identity.publicKey, verified: true, share: 100 },
  //     ],
  //   },
  // }).sendAndConfirm(umi);
  // console.log("mint sucess");

  // const signatureBase58 = bs58.encode(signature);

  // return signatureBase58;
};
