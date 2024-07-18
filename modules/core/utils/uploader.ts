import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { umi } from "./connection";

interface UploadFileProps {
  img: File;
}

export const uploadFile = async ({ img }: UploadFileProps) => {
  // Parse a generic file to and from a browser file.
  const imgFile = await createGenericFileFromBrowserFile(img, {
    displayName: img.name,
    contentType: "image/png",
  });

  const [myUri] = await umi.uploader.upload([imgFile]);

  return myUri;
};
