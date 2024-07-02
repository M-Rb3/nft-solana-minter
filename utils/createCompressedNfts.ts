// Create cNFT maually without using metaplex

// import {
//   PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
//   createCreateTreeInstruction,
// } from "@metaplex-foundation/mpl-bubblegum";
// import {
//   SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
//   SPL_NOOP_PROGRAM_ID,
//   ValidDepthSizePair,
//   createAllocTreeIx,
// } from "@solana/spl-account-compression";
// import { Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
// import { SolanaConnection } from "./SolanaConnection";
// // define the depth and buffer size of our tree to be created
// const maxDepthSizePair: ValidDepthSizePair = {
//   // max=16,384 nodes (for a `maxDepth` of 14)
//   maxDepth: 14,
//   maxBufferSize: 64,
// };

// const depthSizePair: ValidDepthSizePair = {
//   // max=8 nodes
//   // maxDepth: 3,
//   // maxBufferSize: 8,

//   // max=16,384 nodes
//   maxDepth: 14,
//   maxBufferSize: 64,

//   // max=131,072 nodes
//   // maxDepth: 17,
//   // maxBufferSize: 64,

//   // max=1,048,576 nodes
//   //   maxDepth: 20,
//   //   maxBufferSize: 64,

//   // max=67,108,864 nodes
//   // maxDepth: 26,
//   // maxBufferSize: 1024,

//   // max=1,073,741,824 nodes
//   // maxDepth: 30,
//   // maxBufferSize: 2048,
// };

// // define the canopy depth of our tree to be created
// const canopyDepth = 10;

// const treeKeypair = Keypair.generate();

// const senderSecretKey = Uint8Array.from(
//   process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
// );
// const myKeypair = Keypair.fromSecretKey(senderSecretKey);

// // derive the tree's authority (PDA), owned by Bubblegum
// const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
//   [treeKeypair.publicKey.toBuffer()],
//   BUBBLEGUM_PROGRAM_ID
// );

// const connection = new SolanaConnection(clusterApiUrl("testnet"));

// export const createTree = async () => {
//   console.log("testset");

//   // allocate the tree's account onchain with the `space`
//   const allocTreeIx = await createAllocTreeIx(
//     connection,
//     treeKeypair.publicKey,
//     myKeypair.publicKey,
//     maxDepthSizePair,
//     canopyDepth
//   );
//   const createTreeIx = createCreateTreeInstruction(
//     {
//       payer: myKeypair.publicKey,
//       treeCreator: myKeypair.publicKey,
//       treeAuthority,
//       merkleTree: treeKeypair.publicKey,
//       compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
//       logWrapper: SPL_NOOP_PROGRAM_ID,
//     },
//     {
//       maxBufferSize: depthSizePair.maxBufferSize,
//       maxDepth: depthSizePair.maxDepth,
//       public: false,
//     },
//     BUBBLEGUM_PROGRAM_ID
//   );
// };
