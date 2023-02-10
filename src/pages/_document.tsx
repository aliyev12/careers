import { Head, Html, Main, NextScript } from "next/document";
import i18nextConfig from "../../next-i18next.config";
import type { DocumentProps } from "next/document";

export default function Document(props: DocumentProps) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head />
      <body className="dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
