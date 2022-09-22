import Layout from "../components/Layout";
import Head from "next/head";
import { AppProvider } from "../context";

import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Anticipant | Upcoming Movie Trailers</title>
        <meta
          name="description"
          content="The Most Anticipated Movie Trailers Coming To US Theaters."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
