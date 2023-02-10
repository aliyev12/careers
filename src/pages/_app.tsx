import { GlobalProvider } from "@/context/GlobalContext";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";
import { Layout } from "@/components";
import "./globals.css";
import Head from "next/head";

const montserrat = Montserrat({
  variable: "--montserrat-font",
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Careers</title>
        <meta name="description" content="Careers App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalProvider>
        <ThemeProvider attribute="class">
          <div
            className={`${montserrat.className} ${montserrat.variable} flex flex-col justify-between h-screen`}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </ThemeProvider>
      </GlobalProvider>
    </>
  );
}

export default appWithTranslation(App);
