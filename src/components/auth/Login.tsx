import { FormContext } from "@/context/FormContext";
import { Button, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { FC, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { authSchema } from "./authSchema";
// import { InputGroup } from "./InputGroup";
import * as Yup from "yup";
import { EAPIStatus, postJobApplication } from "@/utils";
import { FieldProps, Form } from "@/components/common";

export const Login = () => {
  const { t } = useTranslation();
  const { nextStep } = useContext(FormContext);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: { [k: string]: string },
    helpers: FormikHelpers<{ [k: string]: string }>
  ) {
    // console.log("helpers = ", helpers);
    const { setSubmitting, setErrors } = helpers;
    setSubmitting(true);
    setLoading(true);

    console.log("logging in..");

    // const result = await postJobApplication(values);

    // console.log("result = ", result);

    // if (
    //   result.status === EAPIStatus.validation &&
    //   result.validationErrors &&
    //   Array.isArray(result.validationErrors)
    // ) {
    //   const newErrors: { [k: string]: string } = {};
    //   result.validationErrors.forEach((error) => {
    //     const field = error.param;
    //     if (!newErrors[field]) {
    //       newErrors[field] = error.msg;
    //     }
    //   });
    //   setErrors(newErrors);
    // }

    // if (result.status === EAPIStatus.success) {
    //   // TODO - do something with jobApplication
    //   // result.jobApplication
    //   nextStep();
    // }

    setSubmitting(false);
    setLoading(false);
  }

  const fieldProps = new FieldProps();
  fieldProps.addField("email", t("apply.info.fields.email.label"), "email");
  fieldProps.addField("password", t("apply.info.fields.password.label"));

  return (
    <Form
      handleSubmit={handleSubmit}
      fieldProps={fieldProps.getFields()}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={authSchema(t)}
      submitBtn={(disabled: boolean) => (
        <Button type="submit" className="mt-12" disabled={disabled}>
          Login {loading && <Spinner />}
        </Button>
      )}
    />
  );
};
