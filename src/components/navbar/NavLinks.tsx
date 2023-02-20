import { Navbar as _Navbar } from "flowbite-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";

export const NavLinks: FC<{}> = () => {
  const { t } = useTranslation("common");

  return (
    <_Navbar.Collapse>
      <_Navbar.Link as={Link} href="/" active={true}>
        {t("nav_links.home")}
      </_Navbar.Link>
      <_Navbar.Link as={Link} href="/careers">
        {t("nav_links.careers")}
      </_Navbar.Link>
    </_Navbar.Collapse>
  );
};
