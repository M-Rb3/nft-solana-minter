import { publicKey } from "@metaplex-foundation/umi";
import { fetchCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { umi } from "./connection";

export const getCandyMachine = async (
  candyMachineAddress: string = "AUSJCkxXXqufH3nYZ8CY6MMdjRwqaqaQ42MaNHQQUAfa"
) => {
  try {
    const candyMachinePubkey = publicKey(candyMachineAddress);
    const candyMachine = await fetchCandyMachine(umi, candyMachinePubkey);
    return candyMachine;
  } catch (err) {
    console.log("Error creating candy machine ", err);
  }
};
