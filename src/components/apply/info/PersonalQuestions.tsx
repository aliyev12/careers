import { FormContext } from "@/context/FormContext";
import { Button } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FC, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { IFormValues, initialValues, TFields } from "./constants";
import { infoSchema } from "./infoSchema";
import { InputGroup } from "./InputGroup";
import * as Yup from "yup";
import { Continue } from "../Continue";

const InfoForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: IFormValues,
    helpers: FormikHelpers<IFormValues>
  ) {
    const { setSubmitting } = helpers;
    setSubmitting(true);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/careers`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const parsedResponse = await response.json();

      console.log("parsedResponse = ", parsedResponse);

      if (response.ok && parsedResponse.status === "success") {
        console.log("SUCCESS!!!");
      }
      setSubmitting(false);
      setLoading(false);
    } catch (error) {
      setSubmitting(false);
      setLoading(false);
    }

    // console.log("helpers = ", helpers);
    // console.log("values = ", values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={infoSchema(t)}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const {
          errors,
          touched,
          isValid,
          dirty,
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
          setSubmitting,
        } = formik;

        const field = (id: TFields) => (
          <Field
            id={id}
            name={id}
            component={InputGroup}
            value={values[id]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        );

        return (
          <Form className="w-full">
            <div className="space-y-8">
              {field("firstName")}
              {field("lastName")}
              {field("email")}
              {field("phone")}
            </div>

            {/* '
            
            country
            state
            Additional files (cover letter)

            education
              degree(bs, ms ..)
              graduated Ye
            employment
            langs

            
            <Button
                type="submit"
                className="mt-12"
                disabled={!(dirty && isValid) || isSubmitting}
              >
                Submit
              </Button> */}
            <Continue
              type="submit"
              className="mt-12"
              disabled={!(dirty && isValid) || isSubmitting}
              loading={loading}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export const PersonalQuestions: FC = () => {
  const { parsedResume } = useContext(FormContext);

  // console.log("parsedResume = ", parsedResume);
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col  justify-center">
      <h5 className="mt-5 mb-8 text-left">Personal Information</h5>
      <InfoForm />
    </div>
  );
};
