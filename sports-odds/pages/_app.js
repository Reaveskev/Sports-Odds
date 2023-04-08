import "@/styles/globals.css";
import { AppWrapper } from "@/src/GlobalContext";

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
