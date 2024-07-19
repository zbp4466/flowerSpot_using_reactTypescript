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
  newPassword: string;
  confirmPassword: string;
}

interface ResestPasswordProps {
  setToggleResetPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordModal: React.FC<ResestPasswordProps> = (props) => {
  const { setToggleResetPasswordModal } = props;
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // const { newPassword } = data;
    // const token = window.location.pathname.split("/").pop();
    // axios
    //   .post(`users/reset-password/${token}`, { newPassword })
    //   .then((response) => {
    //     toast.success(response.data.message);
    //     setTimeout(() => {
    //       window.location.href = "/signin";
    //     }, 3000);
    //   })
    //   .catch((error) => {
    //     toast.error("Your link has expired");
    //   });
  };

  const onClickCancelResetPasswordModal = () => {
    setToggleResetPasswordModal(false);
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
      <div className=" mt-20  h-fit lg:mt-0">
        <div className="p-5 w-fit m-auto  sm:p-0 ">
          <h3
            className="text-2xl text-center font-semibold leading-6 text-linear-gray"
            id="modal-title"
          >
            Reset your Password
          </h3>
          <div className="mt-3 text-center sm:mt-0 ">
            {isBrowser && (
              <div className="cancel-box  w-fit  absolute right-2 top-2">
                <img
                  className="w-8 rounded-full  hover:cursor-pointer hover:bg-linear-gradient"
                  src={cancelIcon}
                  alt=""
                  onClick={onClickCancelResetPasswordModal}
                />
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 mt-5 w-96"
            >
              <CommonTextField
                id="newPassword"
                label="New Password"
                type="password"
                name="newPassword"
                control={control}
                variant="filled"
                rules={{
                  required: "New Password is required",
                  minLength: {
                    value: 6,
                    message: "New Password must be at least 6 characters long",
                  },
                }}
              />
              <CommonTextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                control={control}
                variant="filled"
                rules={{
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Confirm Password must be at least 6 characters long",
                  },
                }}
              />

              <CommonButton
                text="Reset Password"
                type="submit"
                variant="contained"
                sx={buttonSx}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordModal;
