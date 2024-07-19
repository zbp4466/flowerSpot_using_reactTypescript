import React from "react";
import cancelIcon from "../../assets/image/cancel.svg";
import CommonTextField from "../CommonTextField";
import CommonButton from "../CommonButton";
import { SxProps, Theme } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

interface FormData {
  email: string;
}

interface ForgotPasswordProps {
  setToggleForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordModal: React.FC<ForgotPasswordProps> = (props) => {
  const { setToggleForgotPasswordModal, setToggleLoginModal } = props;
  const onClickCancelForgotPasswordModal = () => {
    setToggleForgotPasswordModal(false);
  };
  const onClickBackToLogin = () => {
    setToggleForgotPasswordModal(false);
    setToggleLoginModal(true);
  };
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // axios
    //   .post("users/forgetPassword", data)
    //   .then((response) => {
    //     toast.success("Email sent successfully");
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 404) {
    //       toast.error("Email not found");
    //     } else {
    //       toast.error("Server error");
    //     }
    //   });
  };

  const buttonSx: SxProps<Theme> = {
    backgroundColor: "#DF9186",
    marginTop: "15px",
    "&:hover": {
      backgroundColor: "#DF9186",
    },
  };
  return (
    <>
      <div className=" mt-20  h-fit lg:mt-0 ">
        <div className="p-5 w-fit m-auto  sm:p-0 ">
          <h3
            className="text-2xl text-center font-semibold leading-6 text-linear-gray"
            id="modal-title"
          >
            Enter your email and we will send you a link to reset your password.
          </h3>
          <div className="mt-3 text-center sm:mt-0 ">
            {isBrowser && (
              <div className="cancel-box  w-fit  absolute right-2 top-2">
                <img
                  className="w-8 rounded-full  hover:cursor-pointer hover:bg-linear-gradient"
                  src={cancelIcon}
                  alt=""
                  onClick={onClickCancelForgotPasswordModal}
                />
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mx-auto gap-3 mt-5 w-96"
            >
              <CommonTextField
                id="email"
                label="Email Address"
                type="email"
                name="email"
                control={control}
                variant="filled"
                rules={{
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address",
                  },
                }}
              />
              <CommonButton
                text="Send OTP"
                type="submit"
                variant="contained"
                sx={buttonSx}
              />
            </form>
            <div
              className="flex flex-col gap-1 justify-center mt-5"
              id="modal-title"
            >
              <p>OR</p>
              <p
                className="underline w-fit m-auto hover:text-linear-gradient-dark hover:cursor-pointer "
                // onClick={() => setToggleLoginModal(false)}
                onClick={onClickBackToLogin}
              >
                {/* I don't want to login */}
                Back to login
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;
