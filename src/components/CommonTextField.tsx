import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface TextFieldProps {
  id?: string;
  label?: string;
  type: string;
  name: string;
  control: Control<any>;
  rules?: object;
  variant: "filled" | "standard" | "outlined";
}

const CommonTextField: React.FC<TextFieldProps> = (props) => {
  const {
    id = "",
    label = "",
    type = "text",
    name = "",
    control,
    rules = {},
    variant = "filled",
  } = props;

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <TextField
            id={id}
            label={label}
            type={type}
            onChange={field.onChange}
            value={field.value}
            variant={variant}
            name={field.name}
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
    </>
  );
};

export default CommonTextField;
