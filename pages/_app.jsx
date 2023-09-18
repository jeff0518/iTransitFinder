import { SessionProvider } from "next-auth/react";
import NavigationProvider from "@/context/NavigationContext";
import Layout from "../layout/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NavigationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NavigationProvider>
  );
}
