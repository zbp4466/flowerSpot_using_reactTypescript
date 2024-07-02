import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CommonTextField from "../../components/CommonTextField";
import CommonButton from "../../components/CommonButton";
import "./register.css";
import CommonDatePicker from "../../components/CommonDatePicker";
import { SxProps, Theme } from "@mui/system";
import axios from "axios";
import axiosInstance from "../../config/http.config";

interface FormData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  password: string;
}

interface LoginProps {
  setToggleRegisterModal: Dispatch<SetStateAction<boolean>>;
  setToggleRegisterSuccessModal: Dispatch<SetStateAction<boolean>>;
}

const Register: React.FC<LoginProps> = (props) => {
  const { setToggleRegisterModal, setToggleRegisterSuccessModal } = props;
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axiosInstance.post(`users/register`, data);
      setToggleRegisterModal(false);
      setToggleRegisterSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const dateFieldSx: SxProps<Theme> = {
    width: "100%",
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
      <div className="mt-3 text-center  sm:mt-0 ">
        <h3
          className="text-2xl font-semibold leading-6 text-linear-gray "
          id="modal-title"
        >
          Create An Account
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-5 "
        >
          <div className="name-info-box mt-2 flex gap-3">
            <CommonTextField
              id="firstName"
              label="First Name"
              type="text"
              name="first_name"
              control={control}
              variant="filled"
              rules={{
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "First name can only contain letters",
                },
              }}
            />
            <CommonTextField
              id="lastName"
              label="Last Name"
              type="text"
              name="last_name"
              control={control}
              variant="filled"
              rules={{
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Last name can only contain letters",
                },
              }}
            />
          </div>

          <div className="w-full">
            <CommonDatePicker
              id="dateOfBirth"
              name="date_of_birth"
              label="Date of Birth"
              control={control}
              variant="filled"
              sx={dateFieldSx}
              rules={{ required: "Date of birth is required" }}
              fullWidth
            />
          </div>

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
          <CommonTextField
            id="password"
            label="Password"
            type="password"
            name="password"
            control={control}
            variant="filled"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />
          <CommonButton
            text="Create Account"
            type="submit"
            variant="contained"
            sx={buttonSx}
          />
        </form>
        <div
          className="flex flex-col gap-1 justify-center mt-5"
          id="modal-title "
        >
          <p>OR</p>
          <p
            className="text-center  hover:text-linear-gradient-dark hover:cursor-pointer "
            onClick={() => setToggleRegisterModal(false)}
          >
            I don't want to register
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
