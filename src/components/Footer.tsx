import { FC, PropsWithChildren } from "react";
import { Navbar } from "./navbar/Navbar";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export const Footer: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation("common");

  return (
    <footer className="container flex justify-center items-center mx-auto text-sm bg-white dark:bg-gray-800 px-5 md:px-0 py-6 h-10 text-gray-500 dark:text-gray-200">
      <div className="w-full flex flex-col md:flex-row md:justify-between ">
        <div className="order-2 md:order-1 mt-10 md:mt-0 mb-7 md:mb-0 text-center md:text-start">
          <span>©</span> <span>{new Date().getFullYear()}</span>{" "}
          <span>Careers</span>
        </div>
        <ul className="flex flex-col md:flex-row order-1 md:order-2 items-center space-y-5 md:space-y-0">
          <li className="last:mr-0 md:mr-6">
            <Link href="/" className="hover:underline">
              {t("nav_links.home")}
            </Link>
          </li>
          <li className="last:mr-0 md:mr-6">
            <Link href="/about" className="hover:underline">
              {t("nav_links.about")}
            </Link>
          </li>
          <li className="last:mr-0 md:mr-6">
            <Link href="/contact" className="hover:underline">
              {t("nav_links.contact")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
