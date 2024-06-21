import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CommonTextField from "../../components/CommonTextField";
import CommonButton from "../../components/CommonButton";
import "./login.css";
import { SxProps, Theme } from "@mui/system";
import axios from "axios";

interface FormData {
  emailAddress: string;
  password: string;
}

interface LoginProps {
  setToggleLoginModal: Dispatch<SetStateAction<boolean>>;
}

// const Login = ({ setToggleLoginModal }: LoginProps) => {
const Login: React.FC<LoginProps> = (props) => {
  const { setToggleLoginModal } = props;

  // const [inputChange, setInputChange] = useState<FormData>({
  //   emailAddress: "",
  //   password: "",
  // });

  // const { handleSubmit, control } = useForm<FormValues>();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputChange((prev) => ({ ...prev, [name]: value }));
  // };

  const url = "https://flowrspot-api.herokuapp.com";
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(`${url}/api/v1/users/login`, data);
      // setRegisterDetails();
      console.log("response :>> ", response);
      setToggleLoginModal(false);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  // console.log("inputChange :>> ", inputChange);

  // console.log(watch("example"))

  const buttonSx: SxProps<Theme> = {
    backgroundColor: "#DF9186",
    marginTop: "15px",
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
            id="emailAddress"
            label="Email Address"
            type="email"
            name="emailAddress"
            control={control}
            variant="filled"
          />
          <CommonTextField
            id="password"
            label="Password"
            type="password"
            name="password"
            control={control}
            variant="filled"
          />
          <CommonButton
            text="Create Account"
            type="submit"
            variant="contained"
            sx={buttonSx}
            // onClick={() => setToggleLoginModal(false)}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
