import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <main className={geistSans.variable}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </Provider>
  );
}
