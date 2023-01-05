import type { AppProps } from "next/app"
import Header from "src/components/Header/Header"
import Footer from "@global/components/Footer/Footer"
import { GlobalStyle } from "@global/styles"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyle />
            <Header />
            <div className="wrapper">
                <Component {...pageProps} />
            </div>
            <Footer />
        </>
    )
}
export default MyApp
