import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
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
import { createNft } from "@metaplex-foundation/mpl-token-metadata";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { fetchAssetsByCollection } from "@metaplex-foundation/mpl-core";
import { fetchMintAddresses } from "@/utils/fetchMintAddresses";
import { Connection, TransactionResponse } from "@solana/web3.js";
import { base58 } from "@metaplex-foundation/umi/serializers";
const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);

const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!)
  .use(mplBubblegum())
  .use(dasApi());

const senderSecretKey = Uint8Array.from(
  process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
);
const myKeypair = umi.eddsa.createKeypairFromSecretKey(senderSecretKey);
const mySigner = createSignerFromKeypair(umi, myKeypair);
umi.use(signerIdentity(mySigner));
const merkleTree = generateSigner(umi);

const merkleTreeDevnetAddress = publicKey(
  "jUAZJ4iTrzMYL62a2Yiyp4X1cV45GkMfuTmNcxJBH8i"
);

const myPhantomTestnetWallet = publicKey(
  "ExiCVzJwwhe3jKPRTH7Yn9rs259TYXCcbmeVJUWFgqDR"
);
const myPhantomDevnetWallet = publicKey(
  "ExiCVzJwwhe3jKPRTH7Yn9rs259TYXCcbmeVJUWFgqDR"
);

const collectionDevnetMint = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!);

export const fetchMerckleTree = async (merkleTreePubKey: string) => {
  const merkleTreeAddress = publicKey(merkleTreePubKey);

  const merkleTreeAccount = await fetchMerkleTree(umi, merkleTreeAddress);
  return console.log("merkleTreeAccount", merkleTreeAccount);
};

export const createMerckleTree = async () => {
  const merkleTree = generateSigner(umi);
  const builder = await createTree(umi, {
    merkleTree,
    maxDepth: 14,
    maxBufferSize: 64,
    public: false,
  });
  await builder.sendAndConfirm(umi);
  return merkleTree;
};

export const createcNFTs = async (recipientAddress: string) => {
  // const merkleTree = await fetchMerkleTree(umi, merkleTreeDevnetAddress);
  // const treeConfig = await fetchTreeConfigFromSeeds(umi, {
  //   merkleTree: merkleTreeDevnetAddress,
  // });

  // Create a cNFTS to a pre-defined collection

  const recipientPubKey = publicKey(recipientAddress);

  const { signature } = await mintToCollectionV1(umi, {
    leafOwner: recipientPubKey, // cNFT owner
    merkleTree: merkleTreeDevnetAddress,
    collectionMint: collectionDevnetMint,

    metadata: {
      name: "Building the future #003",
      uri: "https://arweave.net/1KzjTp2gn-9_fQBjSnd_chFPze5wYI6eipnD2DoI440",
      sellerFeeBasisPoints: 500, // 5%
      collection: { key: collectionDevnetMint, verified: true },
      creators: [
        { address: umi.identity.publicKey, verified: true, share: 100 },
      ],
    },
  }).sendAndConfirm(umi);
  console.log("sucess mint", signature);

  // Parse the leaf from the transaction
  // const leaf: LeafSchema = await parseLeafFromMintToCollectionV1Transaction(
  //   umi,
  //   signature
  // );

  // // Get the asset ID associated with the leaf
  // const assetId = findLeafAssetIdPda(umi, {
  //   merkleTree: merkleTreeDevnetAddress,
  //   leafIndex: leaf.nonce,
  // });

  // console.log("Leaf:", leaf);
  // console.log("Asset ID:", assetId.toString());

  // return assetId;
};

export const fetchCollection = async () => {
  const authority = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!);

  const assetsByCollection = await fetchMintAddresses(
    "HYXSHULhGEbkpPZUBHygcZD8Efg6JsgUV7ch64QdrkcQ"
  );
  // await fetchAssetsByCollection(
  //   umi,
  //   collectionDevnetMint
  // );
  console.log("colelction", assetsByCollection);
  return assetsByCollection;
};

export const createNewCollecton = async () => {
  const collectionMintTestnet = generateSigner(umi);
  const collection = await createNft(umi, {
    mint: collectionMintTestnet,
    name: "My Collection",
    uri: "https://example.com/my-collection.json",
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
    isCollection: true,
  }).sendAndConfirm(umi);
  console.log("collection", collection);
};
