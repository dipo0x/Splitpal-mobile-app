import { AuthProvider } from "@/src/lib/authcontext";
import RootRouter from "@/src/routers";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootRouter />
    </AuthProvider>
  );
}
