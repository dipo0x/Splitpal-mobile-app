import { Asset } from "expo-asset";

export async function preloadImages() {
  const images = [
    require("@/assets/images/artwork.png"),
    require("@/assets/images/view-bills-image.png"),
    require("@/assets/images/signin-logo.png"),
    require("@/assets/images/splitpal-logo.png"),
    require("@/assets/images/splash-icon.png"),
  ];

  const promises = images.map((img) => Asset.loadAsync(img));
  await Promise.all(promises);
}

export default preloadImages;
