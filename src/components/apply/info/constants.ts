export type TFields = "firstName" | "lastName" | "email" | "phone";

export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const fieldProps = (t: (k: string) => string) => ({
  firstName: {
    label: t("apply.info.fields.firstName.label"),
    type: "text",
    required: true,
    placeholder: "",
  },
  lastName: {
    label: t("apply.info.fields.lastName.label"),
    type: "text",
    required: true,
    placeholder: "",
  },
  email: {
    label: t("apply.info.fields.email.label"),
    type: "email",
    required: true,
    placeholder: "",
  },
  phone: {
    label: t("apply.info.fields.phone.label"),
    type: "text",
    required: true,
    placeholder: "",
  },
});
