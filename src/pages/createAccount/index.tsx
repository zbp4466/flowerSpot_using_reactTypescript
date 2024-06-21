import React, {
  ChangeEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CommonTextField from "../../components/CommonTextField";
import CommonButton from "../../components/CommonButton";
import "./createAccount.css";
import CommonDatePicker from "../../components/CommonDatePicker";
import { SxProps, Theme } from "@mui/system";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emailAddress: string;
  password: string;
}

// interface registerDetails {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   emailAddress: string;
//   password: string;
// }

interface LoginProps {
  setToggleRegisterModal: Dispatch<SetStateAction<boolean>>;
}

// const Login = ({ setToggleRegisterModal }: LoginProps) => {
const CreateAccount: React.FC<LoginProps> = (props) => {
  const url = "https://flowrspot-api.herokuapp.com";
  const { setToggleRegisterModal } = props;
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(`${url}/api/v1/users/register`, data);
      // setRegisterDetails();
      console.log("response :>> ", response);
      setToggleRegisterModal(false);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
  // const [inputChange, setInputChange] = useState<FormData>({
  //   firstName: "",
  //   lastName: "",
  //   dateOfBirth: "",
  //   emailAddress: "",
  //   password: "",
  // });

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const [registerDetails, setRegisterDetails] = useState<registerDetails[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputChange((prev) => ({ ...prev, [name]: value }));
  // };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   // setIsLoading(true);
  //   e.preventDefault();
  //   try {
  //     const response = axios.post(`${url}/api/v1/users/register`);
  //     // setRegisterDetails();
  //     console.log("response :>> ", response);
  //     setToggleRegisterModal(false);
  //     // setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     // setIsLoading(false);
  //   }
  // };

  // console.log({ inputChange });

  // console.log("inputChange :>> ", inputChange);

  // console.log(watch("example"))

  const dateFieldSx: SxProps<Theme> = {
    width: "100%",
  };
  const buttonSx: SxProps<Theme> = {
    backgroundColor: "#DF9186",
    marginTop: "15px",
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
              name="firstName"
              control={control}
              variant="filled"
            />
            <CommonTextField
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              control={control}
              variant="filled"
            />
          </div>
          <div className="other-info-box flex flex-col gap-3">
            {/* <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => {
                console.log("field :>> ", field);
                return (
                  <CommonDatePicker
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth"
                    variant="filled"
                    sx={dateFieldSx}
                  />
                );
              }}
            /> */}
            <CommonDatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              control={control}
              variant="filled"
              sx={dateFieldSx}
            />
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
              // onClick={() => setToggleRegisterModal(false)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
