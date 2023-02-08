import { Nunito } from "@next/font/google";
import "./globals.css";
import { Navbar } from "./Navbar";

const nunito = Nunito({
  variable: "--nunito-font",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @TODO make lang="en" dynamic
  return (
    <html lang="en" className={nunito.variable}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
