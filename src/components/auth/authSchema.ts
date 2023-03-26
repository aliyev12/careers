// import isMobilePhone from "validator/lib/isMobilePhone";
import * as Yup from "yup";

export function authSchema(t: (k: string) => string) {
  return Yup.object().shape({
    email: Yup.string()
      .email(t("apply.info.error.email.invalid"))
      .required(t("apply.info.error.email.required")),
    password: Yup.string()
      .required(t("apply.info.error.password.required"))
      .min(4, t("apply.info.error.password.min")),
  });
}
