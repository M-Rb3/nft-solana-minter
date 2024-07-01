import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplCandyMachine,
  fetchCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { publicKey } from "@metaplex-foundation/umi";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";

import { keypairIdentity } from "@metaplex-foundation/umi";

// Create Umi Instance
const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL!).use(dasApi());

// Import your private key file and parse it.
const wallet = "./my-wallet.json";

// Create a keypair from your private key
const keypair = umi.eddsa.createKeypairFromSecretKey(
  Uint8Array.from(
    process.env
      .NEXT_PUBLIC_SENDER_SECRET_KEY!.split(",")
      .map((val) => Number(val))
  )
);
console.log("keypair", keypair.secretKey);

// Register it to the Umi client.
umi.use(keypairIdentity(keypair));

interface Metadata {
  mint: string;
}

const fetchMetadata = async (uri: string): Promise<Metadata> => {
  const response = await fetch(uri);
  const data = await response.json();
  console.log("test", data);

  return data;
};

export const fetchMintAddresses = async (
  candyMachineId: string
): Promise<string[]> => {
  try {
    const assets = await umi.rpc.getAssetsByGroup({
      groupKey: "collection",
      groupValue: candyMachineId,
    });

    const mintAddresses = assets.items.map(({ id }) => id);

    return mintAddresses;
  } catch (error) {
    console.error("Error fetching Candy Machine:", error);
    return [];
  }
};
