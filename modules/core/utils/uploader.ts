import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { umi } from "./connection";

interface UploadFileProps {
  img: File;
}

export const uploadFile = async ({ img }: UploadFileProps) => {
  // Parse a generic file to and from a browser file.
  console.log(img);

  const file = await createGenericFileFromBrowserFile(img, {
    displayName: img.name,
    contentType: img.type,
  });

  const [myUri] = await umi.uploader.upload([file]);

  return myUri;
};
