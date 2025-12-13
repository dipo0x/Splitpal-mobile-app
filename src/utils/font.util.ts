import { useFonts } from 'expo-font';
export const useLoadFonts = () => {
  return useFonts({
    'Satoshi-Black': require('@/assets/fonts/satoshi/Satoshi-Black.otf'),
    'Satoshi-BlackItalic': require('@/assets/fonts/satoshi/Satoshi-BlackItalic.otf'),
    'Satoshi-Bold': require('@/assets/fonts/satoshi/Satoshi-Bold.otf'),
    'Satoshi-BoldItalic': require('@/assets/fonts/satoshi/Satoshi-BoldItalic.otf'),
    'Satoshi-Italic': require('@/assets/fonts/satoshi/Satoshi-Italic.otf'),
    'Satoshi-Light': require('@/assets/fonts/satoshi/Satoshi-Light.otf'),
    'Satoshi-LightItalic': require('@/assets/fonts/satoshi/Satoshi-LightItalic.otf'),
    'Satoshi-Medium': require('@/assets/fonts/satoshi/Satoshi-Medium.otf'),
    'Satoshi-MediumItalic': require('@/assets/fonts/satoshi/Satoshi-MediumItalic.otf'),
    'Satoshi-Regular': require('@/assets/fonts/satoshi/Satoshi-Regular.otf'),
  });
};