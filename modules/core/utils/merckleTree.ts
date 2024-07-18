import { generateSigner } from "@metaplex-foundation/umi";
import { createTree } from "@metaplex-foundation/mpl-bubblegum";
import { umi } from "./connection";

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
