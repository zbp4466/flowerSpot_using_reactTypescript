import { SxProps, Theme } from "@mui/system";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import React from "react";
import moment from "moment";
import { Controller } from "react-hook-form";

interface DatePickerProps {
  id: string;
  label: string;
  name: string;
  variant: "filled" | "standard" | "outlined";
  sx: SxProps<Theme>;
  isError?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  disableFuture?: boolean;
  isDisabled?: boolean;
  disablePast?: boolean;
  control?: any;
  rules?: any;
}

const CommonDatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    defaultValue,
    label,
    fullWidth = true,
    isDisabled = false,
    disableFuture = true,
    disablePast = false,
    control,
    variant = "filled",
    name,
    rules = {},
  } = props;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              open={isOpen}
              onOpen={() => !isOpen && setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              defaultValue={defaultValue ? moment(defaultValue) : undefined}
              label={label}
              format="DD MMM YYYY"
              onChange={(newValue) => {
                const value = moment(newValue).format("DD-MM-YYYY");
                field.onChange(value);
              }}
              disabled={isDisabled}
              slotProps={{
                textField: {
                  size: "small",
                  color: "primary",
                  fullWidth: fullWidth,
                  error: !!error,
                  helperText: error ? error.message : "",
                  variant: variant,
                  onClick: () => setIsOpen(true),
                  placeholder: label,
                },
                actionBar: {
                  actions: ["today", "clear", "accept"],
                },
              }}
              disableFuture={disableFuture}
              disablePast={disablePast}
              closeOnSelect
              views={["year", "month", "day"]}
            />
          </LocalizationProvider>
        )}
      />
    </>
  );
};

export default CommonDatePicker;
