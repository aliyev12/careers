import { Button } from "flowbite-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Continue: FC<any> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-center">
      <Button {...props}>{t("apply.continue")}</Button>
    </div>
  );
};
