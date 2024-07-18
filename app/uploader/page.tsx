"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { uploadFile } from "@/modules/core/utils";

const Page = () => {
  const [URI, setURI] = useState("");
  const [image, setImage] = useState<File | null>();

  const handleImgInput = async (imgFile: File) => {
    const uri = await uploadFile({
      img: imgFile,
    });
    setURI(uri);
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center min-h-screen home">
      <Input
        accept="image/png, image/jpeg"
        multiple={false}
        className="w-fit"
        type="file"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
      />
      <Button onClick={() => image && handleImgInput(image)}>
        upload with Irys
      </Button>
      <div className="text-2xl font-bold">{URI}</div>
    </div>
  );
};

export default Page;
