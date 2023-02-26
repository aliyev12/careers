import { Button, Spinner } from "flowbite-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Continue: FC<any> = ({ loading, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-center">
      <Button {...props}>
        {t("apply.continue")}
        {loading && <Spinner aria-label="Loading" className="ml-3" />}
      </Button>
    </div>
  );
};
