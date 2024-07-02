import React, { Dispatch, SetStateAction } from "react";
import CommonButton from "../CommonButton";
import { SxProps, Theme } from "@mui/system";

interface LoginProps {
  setToggleLoginSuccessModal: Dispatch<SetStateAction<boolean>>;
  setProfile: Dispatch<SetStateAction<boolean>>;
}

const LoginSuccessModal: React.FC<LoginProps> = (props) => {
  const { setToggleLoginSuccessModal, setProfile } = props;
  const onClickOKButton = () => {
    setToggleLoginSuccessModal(false);
  };
  const onClickProfileButton = () => {
    setToggleLoginSuccessModal(false);
    setProfile(true);
  };

  const buttonSx: SxProps<Theme> = {
    backgroundColor: "#DF9186",
    "&:hover": {
      backgroundColor: "#DF9186",
    },
  };
  return (
    <>
      <div className="login-success-modal-container flex flex-col justify-center items-center">
        <p className="text-center mb-5">
          Congratulations! You have successfully logged into FlowerSpot!
        </p>
        <div className="button-box flex gap-3">
          <CommonButton
            text="OK"
            type="submit"
            variant="contained"
            onClick={onClickOKButton}
            sx={buttonSx}
          />
          <CommonButton
            text="Profile"
            variant="contained"
            onClick={onClickProfileButton}
            sx={buttonSx}
          />
        </div>
      </div>
    </>
  );
};

export default LoginSuccessModal;
