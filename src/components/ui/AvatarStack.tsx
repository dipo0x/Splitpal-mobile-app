import React from "react";
import { Image, View } from "react-native";

type AvatarStackProps = {
  images: (string | number)[];
  size?: number;
  overlap?: number;
};

const AvatarStack: React.FC<AvatarStackProps> = ({
  images,
  size = 37,
  overlap = 12,
}) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 15 }}>
      {images.map((image, index) => (
        <Image
          key={index}
          source={typeof image === "string" ? { uri: image } : image}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            marginLeft: index === 0 ? 0 : -overlap,
            borderWidth: 2,
            borderColor: "#fff",
            zIndex: index,
          }}
        />
      ))}
    </View>
  );
};

export default AvatarStack;
