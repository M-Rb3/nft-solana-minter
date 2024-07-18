export const getNftMetaData = ({
  imgURI,
  name,
}: {
  imgURI: string;
  name: string;
}) => ({
  image: imgURI,
  // attributes: [
  //   { trait_type: "Event", value: "Building the future" },
  //   { trait_type: "location", value: "RAK" },
  // ],
  properties: {
    files: [
      {
        uri: imgURI,
        type: "image/png",
      },
    ],
    category: "image",
  },
});

export const getCollectionMetaData = () => {};
