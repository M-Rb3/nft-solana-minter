// // Create core NFTs

// "use server";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import {
//   createV1,
//   fetchAssetsByCollection,
//   mplCore,
// } from "@metaplex-foundation/mpl-core";
// import {
//   GenericFile,
//   createSignerFromKeypair,
//   generateSigner,
//   isKeypairSigner,
//   keypairIdentity,
//   publicKey,
// } from "@metaplex-foundation/umi";
// import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// import { SystemProgram, PublicKey } from "@solana/web3.js";

// // Use the RPC endpoint of your choice.
// const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!)
//   .use(mplCore())
//   .use(irysUploader());

// const collectionPublicKey = publicKey(
//   "HYXSHULhGEbkpPZUBHygcZD8Efg6JsgUV7ch64QdrkcQ"
//   // process.env.NEXT_PUBLIC_COLLECTION_ID || "11111111111111111111111111111111"
// );

// const senderSecretKey = Uint8Array.from(
//   process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
// );
// const myKeypair = umi.eddsa.createKeypairFromSecretKey(senderSecretKey);
// const myKeypairSigner = createSignerFromKeypair(umi, myKeypair);

// // Check if the provided signer is a KeypairSigner object.
// console.log(isKeypairSigner(myKeypairSigner));
// console.log("myKeypairSigner", myKeypairSigner);

// // Register a new keypair as the identity and payer.
// umi.use(keypairIdentity(myKeypair));

// export const createCoreNfts = async (imgFile: GenericFile) => {
//   // upload img file
//   // const [imageUri] = await umi.uploader.upload([imgFile]);
//   // console.log("Image uploaded to:", imageUri);

//   // const uri = await umi.uploader.uploadJson({
//   //   name: "My NFT",
//   //   description: "This is my NFT",
//   //   image: imageUri,
//   // });
//   // console.log("Metadata uploaded to:", uri);

//   try {
//     const result = await createV1(umi, {
//       asset: myKeypairSigner,
//       // collection: collectionPublicKey,
//       name: "My Nft",
//       uri: "https://arweave.net/T3FysmaWvhR2FhCXX0A5X2_cavmjBwNDBv4Z7MBZa3Y",
//     }).sendAndConfirm(umi);
//     console.log("NFT creation result:", result);
//   } catch (err: any) {
//     console.error("Error during NFT creation:", err);
//     // Capture detailed logs from the error
//     if (err.logs) {
//       console.error("Transaction Logs:", err.logs);
//     } else {
//       console.error("Error without logs:", err);
//     }
//   }

//   const assetsByCollection = await fetchAssetsByCollection(
//     umi,
//     collectionPublicKey
//   );

//   console.log("Assets by Collection:", assetsByCollection);
// };
