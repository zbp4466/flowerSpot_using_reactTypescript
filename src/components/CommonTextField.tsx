import { TextField } from "@mui/material";
import React from "react";
import { Controller, FieldValues, UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  id?: string;
  label?: string;
  type: string;
  name: string;
  control: any;
  // register?: any;
  // required?: boolean;
  variant: "filled" | "standard" | "outlined";
}

const CommonTextField: React.FC<TextFieldProps> = (props) => {
  const {
    id = "",
    label = "",
    type = "text",
    name = "",
    control,
    // register,
    // required = true,
    variant = "filled",
  } = props;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            id={id}
            label={label}
            type={type}
            onChange={field.onChange}
            value={field.value}
            variant={variant}
            name={field.name}
          />
        )}
      />
    </>
  );
};

export default CommonTextField;

{
  /* <TextField
id={id}
label={label}
type={type}
{...register(name, { required })}
onChange={onChange}
variant={variant}
name={name}
/> */
}
