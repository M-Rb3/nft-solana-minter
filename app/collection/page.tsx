"use client";

import { Button } from "@/components/ui/button";
import { createNewCollection } from "@/modules/core/utils";
import { Image } from "lucide-react";

const page = () => {
  return (
    <div className="flex justify-around items-center min-h-screen home">
      <Button onClick={createNewCollection}>Create NFT collection</Button>
    </div>
  );
};

export default page;
