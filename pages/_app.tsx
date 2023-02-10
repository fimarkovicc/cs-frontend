import type { AppProps } from "next/app"
import Header from "src/components/Header/Header"
import Footer from "@global/components/Footer/Footer"
import { GlobalStyle } from "@global/styles"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
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
