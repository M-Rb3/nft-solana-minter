import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { Connection } from "@solana/web3.js";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);

const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!)
  .use(mplCandyMachine())
  .use(mplBubblegum())
  .use(dasApi())
  .use(irysUploader());

const senderSecretKey = Uint8Array.from(
  process.env.NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",").map(Number)
);
const keypair = umi.eddsa.createKeypairFromSecretKey(senderSecretKey);

const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

export { umi, signer, keypair };
