import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown, Navbar as _Navbar } from "flowbite-react";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";
import { UserDropdown } from "./UserDropdown";
import { NavLinks } from "./NavLinks";
import { LangDropdown } from "./LangDropdown";
import { HiMoon, HiSun } from "react-icons/hi";
import { EMode } from "@/interfaces";
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";

export const Navbar: FC<{}> = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation("common");

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <_Navbar fluid={false} rounded={true} className="px-5">
        <_Navbar.Brand as={Link} href="/" className="flex items-center">
          <img src="/logo.svg" className="mr-3 h-14 w-14" alt="Careers Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Careers
          </span>
        </_Navbar.Brand>
        <div className="flex items-center md:order-2">
          <div className="mr-3 md:mr-8">
            <LangDropdown />
          </div>

          {/* <div className="mr-3 md:mr-8">
            <UserDropdown />
          </div> */}
          <div className="mr-3 flex md:mr-0">
            <Classic
              duration={750}
              toggled={theme === EMode.light}
              onToggle={() =>
                setTheme(theme === EMode.dark ? EMode.light : EMode.dark)
              }
              className="color-theme-toggle"
            />
          </div>
          <_Navbar.Toggle />
        </div>
        <NavLinks />
      </_Navbar>
    </>
  );
};
