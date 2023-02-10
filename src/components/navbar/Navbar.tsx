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
          <img src="logo.svg" className="mr-3 w-14 h-14" alt="Careers Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Careers
          </span>
        </_Navbar.Brand>
        <div className="flex items-center md:order-2">
          <div className="mr-3 md:mr-8">
            <LangDropdown />
          </div>

          <div className="mr-3 md:mr-8">
            <UserDropdown />
          </div>
          <div className="flex mr-3 md:mr-0">
            <Button
              color="light"
              onClick={() =>
                setTheme(theme === EMode.dark ? EMode.light : EMode.dark)
              }
            >
              {theme === EMode.light ? (
                <HiMoon className="h-4 w-4" />
              ) : (
                <HiSun className="h-4 w-4" />
              )}
            </Button>
          </div>
          <_Navbar.Toggle />
        </div>
        <NavLinks />
      </_Navbar>
    </>
  );
};
