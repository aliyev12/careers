import isMobilePhone from "validator/lib/isMobilePhone";
import * as Yup from "yup";

export function infoSchema(t: (k: string) => string) {
  return Yup.object().shape({
    firstName: Yup.string()
      .min(1, t("apply.info.error.firstName.min"))
      .required(t("apply.info.error.firstName.required")),

    lastName: Yup.string()
      .min(1, t("apply.info.error.lastName.min"))
      .required(t("apply.info.error.lastName.required")),

    email: Yup.string()
      .email(t("apply.info.error.email.invalid"))
      .required(t("apply.info.error.email.required")),

    phone: Yup.string()
      .test(
        "valid-phone-number",
        t("apply.info.error.phone.invalid"),
        (value) => {
          if (!value) return false;
          return isMobilePhone(value, "en-US");
        }
      )
      .required(t("apply.info.error.phone.required")),

    // password: Yup.string()
    //   .required("Password is required")
    //   .min(4, "Password is too short - should be 4 chars minimum"),
  });
}
