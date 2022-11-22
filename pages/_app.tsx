import type { AppProps } from "next/app";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { GlobalStyle } from "../styles";
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <link
        rel="preload"
        href="/fonts/Inter-Regular.ttf"
        type="font/ttf"
        as="font"
        crossOrigin=""
      />
      </Head>
      <GlobalStyle />
      <div className="wrapper">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
export default MyApp;
