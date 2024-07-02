import { Button } from "@mui/material";
import React from "react";
import { SxProps, Theme } from "@mui/system";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: string;
  variant: "text" | "contained" | "outlined";
  sx?: SxProps<Theme>;
}

const CommonButton: React.FC<ButtonProps> = (props) => {
  const {
    text = "Submit",
    type = "button",
    onClick = () => {},
    variant = "contained",
    sx,
  } = props;
  return (
    <>
      <Button href="" type={type} variant={variant} onClick={onClick} sx={sx}>
        {text}
      </Button>
    </>
  );
};

export default CommonButton;
