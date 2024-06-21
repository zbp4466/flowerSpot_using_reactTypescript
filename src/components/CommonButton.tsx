import { Button } from "@mui/material";
import React from "react";
import { SxProps, Theme } from "@mui/system";

interface ButtonProps {
  text: string;
  onClick?: () => {};
  type?: string;
  variant: "text" | "contained" | "outlined";
  sx: SxProps<Theme>;
}
// const CommonButton = ({children, className = ""} : {children: any, className: string,}) => {
//   return (
//     <>
//       <button
//         data-modal-target="authentication-modal"
//         data-modal-toggle="authentication-modal"
//         className="text-linear-gradient-2"
//         type="button"
//       >
//         {children}
//       </button>
//     </>
//   );
// };
const CommonButton: React.FC<ButtonProps> = (props) => {
  const {
    text = "Submit",
    type = "submit",
    onClick = () => {},
    variant = "contained",
    sx,
  } = props;
  return (
    <>
      <Button variant={variant} onClick={onClick} sx={sx}>
        {text}
      </Button>
    </>
  );
};

export default CommonButton;
