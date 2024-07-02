import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CommonTextField from "../../components/CommonTextField";
import CommonButton from "../../components/CommonButton";
import "./login.css";
import { SxProps, Theme } from "@mui/system";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../config/http.config";

interface FormData {
  email: string;
  password: string;
}

interface LoginProps {
  setToggleLoginModal: Dispatch<SetStateAction<boolean>>;
  setToggleLoginSuccessModal: Dispatch<SetStateAction<boolean>>;
}

// const Login = ({ setToggleLoginModal }: LoginProps) => {
const Login: React.FC<LoginProps> = (props) => {
  const { setToggleLoginModal, setToggleLoginSuccessModal } = props;

  const { handleSubmit, control, setError } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axiosInstance.post(`users/login`, data);
      setToggleLoginModal(false);
      setToggleLoginSuccessModal(true);
      console.log("response.data :>> ", response.data);
      localStorage.setItem("token", response.data.auth_token);

      // setIsLoading(false);
    } catch (error) {
      // console.log(error);
      // toast.error("Invalid Email or Password");
      // toast.error("Invalid Email or Password.", {
      //   style: {
      //     border: "1px solid #FF0000",
      //     padding: "16px",
      //     color: "#FF0000",
      //   },
      //   iconTheme: {
      //     primary: "#FF0000",
      //     secondary: "#FFFF",
      //   },
      // });
      setError("email", {
        type: "manual",
        message: "Incorrect email or password",
      });
      setError("password", {
        type: "manual",
        message: "Incorrect email or password",
      });
    }
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
      <div className="mt-3 text-center sm:mt-0 ">
        <h3
          className="text-2xl  font-semibold leading-6 text-linear-gray "
          id="modal-title"
        >
          Welcome Back
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-5 w-96"
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
          id="modal-title"
        >
          <p>OR</p>
          <p
            className="text-center  hover:text-linear-gradient-dark hover:cursor-pointer "
            onClick={() => setToggleLoginModal(false)}
          >
            I don't want to login
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
