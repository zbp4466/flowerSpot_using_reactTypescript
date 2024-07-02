import React, { Dispatch, SetStateAction } from "react";
import CommonButton from "../CommonButton";
import { SxProps, Theme } from "@mui/system";

interface LoginProps {
  setToggleRegisterSuccessModal: Dispatch<SetStateAction<boolean>>;
  setToggleLoginModal: Dispatch<SetStateAction<boolean>>;
}

const RegisterSuccessModal: React.FC<LoginProps> = (props) => {
  const { setToggleRegisterSuccessModal, setToggleLoginModal } = props;
  const onClickOKButton = () => {
    setToggleRegisterSuccessModal(false);
    setToggleLoginModal(true);
  };

  const buttonSx: SxProps<Theme> = {
    backgroundColor: "#DF9186",
    "&:hover": {
      backgroundColor: "#DF9186",
    },
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p className=" text-center mb-5">
          Congratulations! You have successfully signed up for FlowerSpot!
        </p>
        <div className="button-box flex gap-3 ">
          <CommonButton
            text="OK"
            type="submit"
            variant="contained"
            onClick={onClickOKButton}
            sx={buttonSx}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterSuccessModal;
