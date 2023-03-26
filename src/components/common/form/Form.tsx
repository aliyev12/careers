import { TFieldPropsReturn, TFormhandleSubmit } from "@/interfaces";
import { Field, Form as _Form, Formik } from "formik";
import { FC, Fragment } from "react";
import { InputGroup } from "./InputGroup";

export const Form: FC<{
  handleSubmit: TFormhandleSubmit;
  initialValues: any;
  submitBtn: (d: boolean) => JSX.Element;
  fieldProps: TFieldPropsReturn;
  validationSchema: any;
  initialTouched?: { [k: string]: boolean };
  // validationSchema: (
  //   t: (arg: string) => string
  // ) => Yup.ObjectSchema<
  //   { [k: string]: string },
  //   Yup.AnyObject,
  //   { [k: string]: string },
  //   ""
  // >;
}> = ({
  handleSubmit,
  initialValues,
  submitBtn,
  validationSchema,
  fieldProps,
  initialTouched,
}) => {
  const optionalProps = initialTouched ? { initialTouched } : {};
  return (
    <Formik
      validateOnMount
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      {...optionalProps}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleBlur,
          dirty,
          isValid,
          isSubmitting,
        } = formik;
        // console.log("formik = ", formik);

        const field = (id: string) => (
          <Field
            id={id}
            name={id}
            component={InputGroup}
            value={values[id]}
            onChange={handleChange}
            onBlur={handleBlur}
            fieldProps={fieldProps[id]}
          />
        );

        const disabled = !(dirty && isValid) || isSubmitting;

        return (
          <_Form className="w-full">
            <div className="space-y-8">
              {Object.keys(initialValues).map((fieldName, i) => {
                return <Fragment key={i}>{field(fieldName)}</Fragment>;
              })}
            </div>
            {submitBtn(disabled)}
          </_Form>
        );
      }}
    </Formik>
  );
};
