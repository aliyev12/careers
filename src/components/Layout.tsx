import { FC, PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./navbar/Navbar";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex flex-wrap flex-col items-center justify-between container px-5">
        {children}
      </main>
      <Footer />
    </>
  );
};
