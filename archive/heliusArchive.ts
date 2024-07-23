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
