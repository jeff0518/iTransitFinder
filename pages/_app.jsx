import NavigationProvider from "@/context/NavigationContext";
import SearchProvider from "@/context/SearchContext";
import Layout from "../layout/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NavigationProvider>
      <SearchProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </NavigationProvider>
  );
}
