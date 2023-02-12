import { Html, Head, Main, NextScript } from "next/document"
// eslint-disable-next-line
import Script from "next/script"

export default function Document() {
    return (
        <Html lang="hr-HR">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
                <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`} />
                <Script id="ga-script" strategy="lazyOnload">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.GOOGLE_ANALYTICS}');
                    `}
                </Script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}