import { TFieldPropsReturn, TInputTypes } from "@/interfaces";

export class FieldProps {
  private fields: TFieldPropsReturn;

  constructor() {
    this.fields = {};
  }

  public addField(
    name: string,
    label: string,
    type?: TInputTypes,
    required?: boolean,
    placeholder?: string
  ): void {
    const _type: TInputTypes = type || "text";
    const _required: boolean = typeof required === "boolean" ? required : true;
    const _placeholder: string = placeholder || "";

    this.fields = {
      ...this.fields,
      [name]: {
        label,
        type: _type,
        required: _required,
        placeholder: _placeholder,
      },
    };
  }

  public getFields(): TFieldPropsReturn {
    return this.fields;
  }
}
