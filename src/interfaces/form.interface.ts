import { FormikHelpers } from "formik";

export interface IFieldParameters {
  label: string;
  type: "text" | "email" | "password";
  required: boolean;
  placeholder: string;
}

export type TInputTypes = "text" | "email" | "password";

export interface IAddFieldObjProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  placeholder?: string;
}

export type TFormhandleSubmit = (
  values: { [k: string]: string },
  helpers: FormikHelpers<{ [k: string]: string }>
) => void;

export type TFieldProps = (k: string) => string;

export type TFieldPropsReturn = { [k: string]: IFieldParameters };
