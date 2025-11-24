import { AuthProvider } from "@/src/lib/authcontext.lib";
import RootRouter from "@/src/routers";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootRouter />
    </AuthProvider>
  );
}
