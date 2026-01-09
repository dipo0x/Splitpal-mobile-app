import RootRouter from "@/src/routers";
import "react-native-reanimated";
import { Provider } from "react-redux";
import store from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}
