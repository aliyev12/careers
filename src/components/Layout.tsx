import { FC, PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./navbar/Navbar";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mb-auto px-5">{children}</main>
      <Footer />
    </>
  );
};
