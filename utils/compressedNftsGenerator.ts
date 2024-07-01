import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Helius } from "helius-sdk";
import { Keypair } from "@solana/web3.js";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  LeafSchema,
  createTree,
  fetchMerkleTree,
  fetchTreeConfigFromSeeds,
  findLeafAssetIdPda,
  mintToCollectionV1,
  mplBubblegum,
  parseLeafFromMintToCollectionV1Transaction,
} from "@metaplex-foundation/mpl-bubblegum";
import { publicKey } from "@metaplex-foundation/umi";
import { mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";

// console.log("process.env.HELIUS_API_KEY", process.env.HELIUS_API_KEY);

// const helius = new Helius(process.env.HELIUS_API_KEY || "");

// // Get Assets from owner
// const getAssetsByOwner = async () => {
//   const response = await helius.rpc.getAssetsByOwner({
//     ownerAddress: "2dTXMokQsMfU1Wx6V3BAnRxSiyq8D4bbHQBJzM5uhNQp",
//     page: 1,
//   });
//   console.log(response.items);
// };

// const senderSecretKey = Uint8Array.from(
//   process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
// );
// const myKeypair = Keypair.fromSecretKey(senderSecretKey);

// export const createCNFT = async () => {
//   // 1. Delegate Helius as a collection authority
//   try {
//     await helius.delegateCollectionAuthority({
//       collectionMint: "HYXSHULhGEbkpPZUBHygcZD8Efg6JsgUV7ch64QdrkcQ",
//       updateAuthorityKeypair: myKeypair,
//     });
//   } catch (err) {
//     console.error("error delegation collection authority", err);
//   }
//   // 2. Mint your cNFT to the collection
//   const response = await helius.mintCompressedNft({
//     name: "Feitan Portor",
//     symbol: "FEITAN",
//     owner: "ExiCVzJwwhe3jKPRTH7Yn9rs259TYXCcbmeVJUWFgqDR",
//     collection: "HYXSHULhGEbkpPZUBHygcZD8Efg6JsgUV7ch64QdrkcQ",
//     description: "Feitan Portor is a member of the notorious Phantom Troupe.",
//     attributes: [
//       {
//         trait_type: "Affiliation",
//         value: "Phantom Troupe",
//       },
//       {
//         trait_type: "Nen Ability",
//         value: "Pain Packer",
//       },
//     ],
//     externalUrl: "https://rakdao.com",
//     imagePath: "./rakdao.png",
//     walletPrivateKey: "2dTXMokQsMfU1Wx6V3BAnRxSiyq8D4bbHQBJzM5uhNQp",
//   });
//   console.log(response);
// };
console.log("yrdy", process.env.NEXT_PUBLIC_RPC_URL!);

const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!).use(mplBubblegum());

const senderSecretKey = Uint8Array.from(
  process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
);
const myKeypair = umi.eddsa.createKeypairFromSecretKey(senderSecretKey);
const mySigner = createSignerFromKeypair(umi, myKeypair);
umi.use(signerIdentity(mySigner));
const merkleTree = generateSigner(umi);

export const createMerckleTree = async () => {
  // Create Tree
  const merkleTree = generateSigner(umi);
  const builder = await createTree(umi, {
    merkleTree,
    maxDepth: 14,
    maxBufferSize: 64,
    public: false,
  });
  console.log("test 1");

  await builder.sendAndConfirm(umi);
  const merkleTreeAccount = await fetchMerkleTree(umi, merkleTree.publicKey);
  // console.log("merkleTreeAccount", merkleTreeAccount);

  // fetch Tree

  // console.log("test 2");
  // const merkleTreeAddress = publicKey(
  //   "CJFo7saPmRpQkcwLbv919PPe2XLz5oDyJ64yMaoMxN4j"
  // );
  // const myPhantomWallet = publicKey(
  //   "ExiCVzJwwhe3jKPRTH7Yn9rs259TYXCcbmeVJUWFgqDR"
  // );
  // const collectionMint = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!);
  // const merkleTree = await fetchMerkleTree(umi, merkleTreeAddress);
  // const treeConfig = await fetchTreeConfigFromSeeds(umi, {
  //   merkleTree: merkleTreeAddress,
  // });

  // // Create a cNFTS to a pre-defined collection

  // const { signature } = await mintToCollectionV1(umi, {
  //   leafOwner: myPhantomWallet, // cNFT owner
  //   merkleTree: merkleTree.publicKey,
  //   collectionMint,

  //   metadata: {
  //     name: "My Compressed NFT",
  //     uri: "https://arweave.net/V48JTzBnpJGYLKAKjJ6LkkDfhE9Y-RyWKolnZk3TJrE",
  //     sellerFeeBasisPoints: 500, // 5%
  //     collection: { key: collectionMint, verified: false },
  //     creators: [
  //       { address: umi.identity.publicKey, verified: false, share: 100 },
  //     ],
  //   },
  // }).sendAndConfirm(umi);
  // console.log("sucess mint");

  // const leaf: LeafSchema = await parseLeafFromMintToCollectionV1Transaction(
  //   umi,
  //   signature
  // );
  // const assetId = findLeafAssetIdPda(umi, {
  //   merkleTree: merkleTree.publicKey,
  //   leafIndex: leaf.nonce,
  // });
  // console.log("assetId", assetId);
};

export const createNewCollecton = async () => {
  const collectionMintTestnet = generateSigner(umi);
  const test = await createNft(umi, {
    mint: collectionMintTestnet,
    name: "My Collection",
    uri: "https://example.com/my-collection.json",
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
    isCollection: true,
  }).sendAndConfirm(umi);
  console.log("test", test);
};
