import { FormContext } from "@/context/FormContext";
import { Button } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { initialValues, TFields } from "./constants";
import { infoSchema } from "./infoSchema";
import { InputGroup } from "./InputGroup";
import * as Yup from "yup";
import { Continue } from "../Continue";

const InfoForm = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={infoSchema(t)}
      onSubmit={(values) => {
        console.log("values = ", values);
      }}
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

            {/* <Button
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
