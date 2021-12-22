import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { NextSeo } from "next-seo";
import theme from "theme";
import Head from "next/head";
import { useInitializeMetamask } from "store/metamask";

export default function MyApp({ Component, pageProps }: AppProps) {
  useInitializeMetamask();

  return (
    <>
      <NextSeo
        title="Gift NFT Cards"
        description="Gift your loves ones this holiday season NFT Gift cards which wrap in crypto goodies inside."
      />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
