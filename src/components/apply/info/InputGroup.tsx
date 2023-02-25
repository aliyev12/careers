import { Label, TextInput, TextInputColors } from "flowbite-react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { HiExclamationCircle } from "react-icons/hi";
import { fieldProps, TFields } from "./constants";

export const InputGroup: FC<{
  id: TFields;
  name: string;
  value: string;
  form: any;
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
    form: { touched, errors },
    ..._props
  } = props;

  const { t } = useTranslation("common");

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

  const { label, required, type, placeholder } = fieldProps(t)[id];

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

// export const InputGroup: FC<{
//   type: "text" | "email";
//   label: string;
//   id: string;
//   placeholder?: string;
//   isRequired: boolean;
//   value: string;
// }> = ({ type, label, id, placeholder, isRequired = false, value }) => {
//   function getInputType() {
//     if (type === "text" || type === "email") {
//       return type;
//     }
//   }
//   return (
//     <div>
//       <div className="mb-2 block">
//         <Label htmlFor={id} value={label} />
//       </div>
//       {type === "text" && (
//         <TextInput
//           id={id}
//           type={getInputType()}
//           placeholder={placeholder ? placeholder : ""}
//           required={isRequired}
//         />
//       )}
//     </div>
//   );
// };
