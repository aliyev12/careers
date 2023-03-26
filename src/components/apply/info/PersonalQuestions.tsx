import { FormContext } from "@/context/FormContext";
import { Button } from "flowbite-react";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { FC, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { infoSchema } from "./infoSchema";
// import { InputGroup } from "./InputGroup";
import * as Yup from "yup";
import { Continue } from "../Continue";
import { EAPIStatus, postJobApplication } from "@/utils";
import { FieldProps, Form } from "@/components/common";
import { extractInfoFromParsedResume } from "@/utils/extractInfoFromParsedResume";

const InfoForm = () => {
  const { t } = useTranslation();
  const { nextStep, parsedResume } = useContext(FormContext);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: { [k: string]: string },
    helpers: FormikHelpers<{ [k: string]: string }>
  ) {
    // console.log("helpers = ", helpers);
    const { setSubmitting, setErrors } = helpers;
    setSubmitting(true);
    setLoading(true);

    const result = await postJobApplication(values);

    console.log("result = ", result);

    if (
      result.status === EAPIStatus.validation &&
      result.validationErrors &&
      Array.isArray(result.validationErrors)
    ) {
      const newErrors: { [k: string]: string } = {};
      result.validationErrors.forEach((error) => {
        const field = error.param;
        if (!newErrors[field]) {
          newErrors[field] = error.msg;
        }
      });
      setErrors(newErrors);
    }

    if (result.status === EAPIStatus.success) {
      // TODO - do something with jobApplication
      // result.jobApplication
      nextStep();
    }

    setSubmitting(false);
    setLoading(false);
  }

  const fieldProps = new FieldProps();
  fieldProps.addField("firstName", t("apply.info.fields.firstName.label"));
  fieldProps.addField("lastName", t("apply.info.fields.lastName.label"));
  fieldProps.addField("email", t("apply.info.fields.email.label"), "email");
  fieldProps.addField("phone", t("apply.info.fields.phone.label"));

  // console.log("fieldProps.getFields() = ", fieldProps.getFields());

  function getInitVals() {
    const newInitVals: { [k: string]: string } = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    const extractedInfo = extractInfoFromParsedResume(parsedResume);
    for (const fieldKey in extractedInfo) {
      const item = extractedInfo[fieldKey];
      if (item.status === EAPIStatus.success) {
        newInitVals[fieldKey] = item.value ? item.value : "";
      }
    }
    return newInitVals;
  }

  function getInitTouched(initVals: { [k: string]: string }) {
    const newInitTouched: { [k: string]: boolean } = {
      firstName: false,
      lastName: false,
      phone: false,
      email: false,
    };

    for (const fieldKey in newInitTouched) {
      const item = newInitTouched[fieldKey];
      if (initVals[fieldKey] !== "") {
        newInitTouched[fieldKey] = true;
      }
    }

    return newInitTouched;
  }

  const initialValues = getInitVals();
  const initialTouched = getInitTouched(initialValues);

  return (
    <Form
      handleSubmit={handleSubmit}
      fieldProps={fieldProps.getFields()}
      initialValues={initialValues}
      validationSchema={infoSchema(t)}
      initialTouched={initialTouched}
      submitBtn={(disabled: boolean) => (
        <Continue
          type="submit"
          className="mt-12"
          disabled={disabled}
          loading={loading}
        />
      )}
    />
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

// return (
//   <Formik
//     initialValues={initialValues}
//     validationSchema={infoSchema(t)}
//     onSubmit={handleSubmit}
//   >
//     {(formik) => {
//       const {
//         errors,
//         touched,
//         isValid,
//         dirty,
//         values,
//         handleChange,
//         handleBlur,
//         isSubmitting,
//         handleSubmit,
//         setSubmitting,
//         status,
//       } = formik;

//       // console.log("formik = ", formik);

//       const field = (id: TFields) => (
//         <Field
//           id={id}
//           name={id}
//           component={InputGroup}
//           render
//           value={values[id]}
//           onChange={handleChange}
//           onBlur={handleBlur}
//         />
//       );

//       return (
//         <Form className="w-full">
//           <div className="space-y-8">
//             {field("firstName")}
//             {field("lastName")}
//             {field("email")}
//             {field("phone")}
//           </div>

//           {/* '

//           country
//           state
//           Additional files (cover letter)

//           education
//             degree(bs, ms ..)
//             graduated Ye
//           employment
//           langs

//           <Button
//               type="submit"
//               className="mt-12"
//               disabled={!(dirty && isValid) || isSubmitting}
//             >
//               Submit
//             </Button> */}
//           <Continue
//             type="submit"
//             className="mt-12"
//             disabled={!(dirty && isValid) || isSubmitting}
//             loading={loading}
//           />
//         </Form>
//       );
//     }}
//   </Formik>
// );
