import { IFieldParameters } from "@/interfaces";
import { Label, TextInput, TextInputColors } from "flowbite-react";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiExclamationCircle } from "react-icons/hi";

export const InputGroup: FC<{
  id: string;
  name: string;
  value: string;
  form: any;
  fieldProps: IFieldParameters;
  field: {
    name: string;
    value: string;
    onChange: (e: any) => void;
  };
}> = (props) => {
  const {
    field,
    name,
    id,
    value,
    fieldProps,
    form: { touched, errors, validateForm, setFieldValue },
    ..._props
  } = props;

  useEffect(() => {
    if (field.value !== "") {
      setFieldValue(name, field.value, true);
      validateForm();
    }
  }, []);

  const colors: TextInputColors = {
    failure: "failure",
    gray: "gray",
    info: "info",
    success: "success",
    warning: "warning",
  };

  const isInvalid = touched[field.name] && errors[field.name];

  const additionalProps: any = {};

  if (isInvalid) {
    additionalProps.helperText = (
      <span className="flex items-center">
        <HiExclamationCircle className="mr-2" />
        <span className="font-medium">{errors[field.name]}</span>
      </span>
    );
    additionalProps.color = colors.failure;
  }

  const { label, required, type, placeholder } = fieldProps;

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      {(type === "text" || type === "email") && (
        <TextInput
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          {...field}
          {..._props}
          {...additionalProps}
        />
      )}
    </div>
  );
};
