import { SessionProvider } from "next-auth/react";
import NavigationProvider from "@/context/NavigationContext";
import SearchProvider from "@/context/SearchContext";
import Layout from "../layout/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavigationProvider>
        <SearchProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchProvider>
      </NavigationProvider>
    </SessionProvider>
  );
}
