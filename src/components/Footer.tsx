import { FC, PropsWithChildren } from "react";
import { Navbar } from "./navbar/Navbar";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export const Footer: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation("common");

  return (
    <footer className="mt-12 w-full border-t border-gray-200 bg-white p-4 shadow dark:border-gray-600 dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
      <div className="flex w-full flex-col md:flex-row md:justify-between ">
        <div className="order-2 mt-10 mb-7 text-center md:order-1 md:mt-0 md:mb-0 md:text-start">
          <span>©</span> <span>{new Date().getFullYear()}</span>{" "}
          <span>Careers</span>
        </div>
        <ul className="order-1 flex flex-col items-center space-y-5 md:order-2 md:flex-row md:space-y-0">
          <li className="last:mr-0 md:mr-6">
            <Link href="/" className="hover:underline">
              {t("nav_links.home")}
            </Link>
          </li>
          {/* <li className="last:mr-0 md:mr-6">
            <Link href="/about" className="hover:underline">
              {t("nav_links.about")}
            </Link>
          </li>
          <li className="last:mr-0 md:mr-6">
            <Link href="/contact" className="hover:underline">
              {t("nav_links.contact")}
            </Link>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};
