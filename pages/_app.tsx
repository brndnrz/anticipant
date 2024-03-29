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
        <meta name="title" content="Anticipant | Upcoming Movie Trailers" />
        <meta
          name="description"
          content="The Most Anticipated Movie Trailers Coming To US Theaters. Become an Anticipant to Anticipate your saved movie trailers with full movie details including: director, cast, plot, release date, movie trailer, and movie poster all for free!"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://anticipant.vercel.app/" />
        <meta
          name="twitter:title"
          content="Anticipant | Upcoming Movie Trailers"
        />
        <meta
          name="twitter:description"
          content="The Most Anticipated Movie Trailers Coming To US Theaters. Become an Anticipant to Anticipate your saved movie trailers with full movie details including: director, cast, plot, release date, movie trailer, and movie poster all for free! "
        />
        <meta name="twitter:image" content="/meta.png" />

        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://anticipant.vercel.app/" />
        <meta name="og:title" content="Anticipant | Upcoming Movie Trailers" />
        <meta
          name="og:description"
          content="The Most Anticipated Movie Trailers Coming To US Theaters. Become an Anticipant to Anticipate your saved movie trailers with full movie details including: director, cast, plot, release date, movie trailer, and movie poster all for free! "
        />
        <meta name="og:image" content="/meta.png" />
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
