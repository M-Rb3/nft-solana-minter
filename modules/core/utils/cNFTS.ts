import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFileFromBrowserFile,
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
  some,
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
import {
  TokenStandard,
  createNft,
} from "@metaplex-foundation/mpl-token-metadata";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { fetchMintAddresses } from "@/utils/fetchMintAddresses";
import { Connection, TransactionResponse } from "@solana/web3.js";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { getNftMetaData } from "../constants/metadata";
import {
  createCollection,
  createCollectionV1,
} from "@metaplex-foundation/mpl-core";
import bs58 from "bs58";
import {
  mplCandyMachine,
  create,
  fetchCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";

interface UploadFileProps {
  img: File;
  name: string;
}

const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);

const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!)
  .use(mplCandyMachine())
  .use(mplBubblegum())
  .use(dasApi())
  .use(irysUploader());

const senderSecretKey = Uint8Array.from(
  process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
);
const myKeypair = umi.eddsa.createKeypairFromSecretKey(senderSecretKey);
const mySigner = createSignerFromKeypair(umi, myKeypair);
umi.use(signerIdentity(mySigner));

const merkleTreeDevnetAddress = publicKey(
  "jUAZJ4iTrzMYL62a2Yiyp4X1cV45GkMfuTmNcxJBH8i"
);

const myPhantomTestnetWallet = publicKey(
  "ExiCVzJwwhe3jKPRTH7Yn9rs259TYXCcbmeVJUWFgqDR"
);
const myPhantomDevnetWallet = publicKey(
  "ExiCVzJwwhe3jKPRTH7Yn9rs259TYXCcbmeVJUWFgqDR"
);
const collectionTEst = publicKey(
  "8pxHdXq8sjBjQQJwfNts8S25GUvqyHqoMbhGfvT1nDbh"
);

const collectionDevnetMint = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!);

export const fetchMerckleTree = async (merkleTreePubKey: string) => {
  const merkleTreeAddress = publicKey(merkleTreePubKey);

  const merkleTreeAccount = await fetchMerkleTree(umi, merkleTreeAddress);
  const treeConfig = await fetchTreeConfigFromSeeds(umi, {
    merkleTree: merkleTreeDevnetAddress,
  });
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
  // Create a cNFTS to a pre-defined collection

  const recipientPubKey = publicKey(recipientAddress);

  const uri = await generateMetaData({
    name: "buidling",
    imgURI:
      "https://arweave.net/Wtz8OiGiuddAYIYOJlpYjt0ZCVVFW0lIHjn3h6rT3AQ?ext=png",
  });

  const { signature } = await mintToCollectionV1(umi, {
    leafOwner: recipientPubKey, // cNFT owner
    merkleTree: merkleTreeDevnetAddress,
    collectionMint: collectionDevnetMint,

    metadata: {
      name: "Building the future",
      uri: uri,
      sellerFeeBasisPoints: 500, // 5%
      collection: { key: collectionDevnetMint, verified: true },
      creators: [
        { address: umi.identity.publicKey, verified: true, share: 100 },
      ],
    },
  }).sendAndConfirm(umi);
  console.log("sucess mint", signature);

  const signatureBase58 = bs58.encode(signature);

  console.log("signatureBase58", signatureBase58);
  return signatureBase58;
};

export const fetchCollection = async (
  collectionAddress: string = "HYXSHULhGEbkpPZUBHygcZD8Efg6JsgUV7ch64QdrkcQ"
) => {
  const assetsByCollection = await fetchMintAddresses(collectionAddress);

  return assetsByCollection;
};

export const createNewCollecton = async ({
  collectionName,
  collectionImg,
}: {
  collectionName: string;
  collectionImg: File;
}) => {
  const collectionMint = generateSigner(umi);
  const candyMachine = generateSigner(umi);

  // upload collection image asset
  const imgURI = await uploadFile({
    img: collectionImg,
    name: collectionName,
  });
  // upload colection metadata
  const uri = await generateMetaData({
    imgURI,
    name: "RAK DAO building the future",
  });

  // Create the Collection NFT.
  await createNft(umi, {
    mint: collectionMint,
    authority: umi.identity,
    name: collectionName,
    uri: uri,
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: true,
  }).sendAndConfirm(umi);

  // Create the Candy Machine.
  const createIx = await create(umi, {
    candyMachine,
    collectionMint: collectionMint.publicKey,
    collectionUpdateAuthority: umi.identity,
    tokenStandard: TokenStandard.NonFungible,
    sellerFeeBasisPoints: percentAmount(0),
    itemsAvailable: 5000,
    creators: [
      {
        address: umi.identity.publicKey,
        verified: true,
        percentageShare: 100,
      },
    ],
    configLineSettings: some({
      prefixName: `${collectionName} #$ID+1$`,
      nameLength: 0,
      prefixUri: "https://arweave.net/",
      uriLength: 43,
      isSequential: false,
    }),
  });
  const { signature } = await createIx.sendAndConfirm(umi);
  const signatureBase58 = bs58.encode(signature);

  console.log("signatureBase58", signatureBase58);
  getTransactionDetails(signature);
  return signatureBase58;
};

export const uploadFile = async ({ img, name }: UploadFileProps) => {
  // Parse a generic file to and from a browser file.
  const imgFile = await createGenericFileFromBrowserFile(img, {
    displayName: name,
    contentType: "image/png",
  });

  const [myUri] = await umi.uploader.upload([imgFile]);

  return myUri;
};

export const generateMetaData = async ({
  imgURI,
  name,
}: {
  imgURI: string;
  name: string;
}) => {
  const myUri = await umi.uploader.uploadJson(getNftMetaData({ imgURI, name }));
  return myUri;
};

async function getTransactionDetails(signature: Uint8Array) {
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

export const getCandyMachine = async (
  candyMachineAddress: string = "AUSJCkxXXqufH3nYZ8CY6MMdjRwqaqaQ42MaNHQQUAfa"
) => {
  const candyMachinePubkey = publicKey(candyMachineAddress);

  const candyMachine = await fetchCandyMachine(umi, candyMachinePubkey);
  console.log("candyMachine", candyMachine);

  return candyMachine;
};
