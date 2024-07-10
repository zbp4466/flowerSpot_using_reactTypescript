import { NavLink } from "react-router-dom";
import flower from "../assets/flower.svg";
import { useEffect, useState } from "react";
import Login from "../pages/login";
import profileIcon from "../assets/profile.svg";
import RegisterSuccessModal from "./modals/RegisterSuccessModal";
import LoginSuccessModal from "./modals/LoginSuccessModal";
import ProfileModal from "./modals/ProfileModal";
// import axios from "axios";
// import Loader from "./Loader";
import axiosInstance from "../config/http.config";
import Register from "../pages/register";
// import { useDispatch } from "react-redux";
// import { AppState } from "../redux/reducers";
// import { useSelector } from "react-redux";
// import { setUserDetails } from "../redux/actions/authAction";
// import { Dispatch } from "redux";
import CommonModal from "./modals/CommonModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import cancelIcon from "../assets/cancel.svg";

import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import { setUserDetails } from "../redux/createSlice/authSlice";

interface NavbarProps {
  setProgressBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { setProgressBar } = props;
  const dispatch = useAppDispatch();
  // const userDetails = useSelector((state: AppState) => state.user.userDetails);
  const userDetails = useAppSelector((state) => state.user.userDetails);

  const [toggleRegisterModal, setToggleRegisterModal] =
    useState<boolean>(false);
  const [toggleRegisterSuccessModal, setToggleRegisterSuccessModal] =
    useState<boolean>(false);
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);
  const [toggleForgotPasswordModal, setToggleForgotPasswordModal] =
    useState<boolean>(false);
  const [toggleResetPasswordModal, setToggleResetPasswordModal] =
    useState<boolean>(false);
  const [toggleLoginSuccessModal, setToggleLoginSuccessModal] =
    useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);

  const onClickProfileIcon = () => {
    setProfile(true);
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    setProgressBar(true);
    try {
      const response = await axiosInstance.get(`users/me`);
      dispatch(setUserDetails(response.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setProgressBar(false);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token && !userDetails) {
      fetchUserInfo();
    }
  }, [toggleLoginModal, userDetails]);

  const clickHamburgerButton = () => {
    setShowDropdownMenu(true);
  };

  const clickDropdownCancelButton = () => {
    setShowDropdownMenu(false);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className=" flex flex-wrap items-center justify-between mx-auto h-16">
          <a
            href="https://flowbite.com/"
            className=" ml-5 flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={flower} alt="logo-img" className="w-10" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap  text-linear-gradient-dark ">
              FlowerSpot
            </span>
          </a>

          <div
            className="flex items-center lg:gap-10"
            // className="hidden  w-full lg:block md:w-auto"
            id="navbar-default"
          >
            <ul className="hidden lg:flex  lg:gap-5 lg:items-center  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/flowers"
                  className="block  bg-blue-700 rounded md:bg-transparent md:hover:text-linear-gradient-dark md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Flowers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/latestSightings"
                  className="block rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-linear-gradient-dark md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Latest Sightings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorites"
                  className="block  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-linear-gradient-dark md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
            <div className="flex items-center gap-5">
              {userDetails ? (
                <div>
                  <p className="text-linear-gradient-dark">
                    {userDetails?.first_name}
                    {"  "}
                    {userDetails?.last_name}
                  </p>
                </div>
              ) : (
                <button
                  className="text-linear-gradient-dark py-2 px-3 hidden lg:flex lg:items-center lg:gap-5 rounded  md:hover:bg-transparent md:border-0 md:hover:text-linear-gradient-dark md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                  type="button"
                  onClick={() => setToggleLoginModal(true)}
                >
                  Login
                </button>
              )}
              {userDetails ? (
                <div
                  className="profile-img w-12  mr-5 "
                  onClick={onClickProfileIcon}
                >
                  <img src={profileIcon} alt="" />
                </div>
              ) : (
                <button
                  className="new-account-btn mr-5 w-36 h-10 hidden  text-white bg-linear-gradient rounded-full lg:block py-2 px-3     md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  type="button"
                  onClick={() => setToggleRegisterModal(true)}
                >
                  New Account
                </button>
              )}
            </div>

            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center mr-5 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={clickHamburgerButton}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        {showDropdownMenu && (
          <div className="fixed bg-white inset-0 z-10 lg:hidden">
            <div className="cancel-box h-16 flex items-center justify-between ">
              <a
                href="https://flowbite.com/"
                className=" ml-5 flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={flower} alt="logo-img" className="w-10" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap  text-linear-gradient-dark ">
                  FlowerSpot
                </span>
              </a>
              <img
                className="w-8 rounded-lg mr-5 hover:cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                src={cancelIcon}
                alt=""
                onClick={clickDropdownCancelButton}
              />
            </div>
            <ul className="flex flex-col gap-5  p-2 mt-5 rounded-lg">
              <NavLink
                to="/flowers"
                className="text-gray-400 font-medium hover:bg-linear-gradient-dark  hover:text-white p-2 rounded-lg ml-5"
              >
                Flowers
              </NavLink>
              <NavLink
                to="/latestSightings"
                className="text-gray-400 font-medium hover:bg-linear-gradient-dark hover:text-white p-2 rounded-lg ml-5"
              >
                Latest Sightings
              </NavLink>
              <NavLink
                to="/favorites"
                className="text-gray-400 font-medium hover:bg-linear-gradient-dark hover:text-white p-2 rounded-lg ml-5"
              >
                Favorites
              </NavLink>
              <hr />
              <NavLink
                to="/login"
                className="text-gray-400 font-medium hover:text-linear-gradient-dark  p-2 rounded-lg ml-5"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className=" p-3 w-fit font-medium  bg-linear-gradient-dark text-white  rounded-full  ml-5"
              >
                New Account
              </NavLink>
            </ul>
          </div>
        )}
      </nav>

      {/* <div className="navbar-conatiner font-Montserrat">
        <div className="navbar-box bg-white border-2 flex justify-between items-center h-16">
          <div className="nav-logo  ml-5 flex justify-center items-center gap-3">
            <img src={flower} alt="logo-img" className="w-10" />
            <p className="font-bold text-linear-gradient-dark text-2xl">
              FlowerSpot
            </p>
          </div>
          <div className="hamburger lg:hidden mr-5">
            <img src={hamburgeriIcon} alt="" onClick={onClickHamburgerIcon} />
          </div>
          <div className="nav-menu hidden lg:flex gap-20 items-center  ">
            <NavLink to="/flowers" className="hover:text-linear-gradient-dark">
              Flowers
            </NavLink>
            <NavLink
              to="/latestSightings"
              className="hover:text-linear-gradient-dark"
            >
              Latest Sightings
            </NavLink>
            <NavLink
              to="/favorites"
              className="hover:text-linear-gradient-dark"
            >
              Favorites
            </NavLink>

            <div className="login-signup-btn flex items-center gap-6">
              {userDetails ? (
                <div>
                  <p className="text-linear-gradient-dark">
                    {userDetails?.first_name}
                    {"  "}
                    {userDetails?.last_name}
                  </p>
                </div>
              ) : (
                <button
                  className="text-linear-gradient-dark "
                  type="button"
                  onClick={() => setToggleLoginModal(true)}
                >
                  Login
                </button>
              )}
              {userDetails ? (
                <div
                  className="profile-img w-12  mr-5"
                  onClick={onClickProfileIcon}
                >
                  <img src={profileIcon} alt="" />
                </div>
              ) : (
                <button
                  className="new-account-btn mr-5 w-36 h-10 text-white bg-linear-gradient rounded-full"
                  type="button"
                  onClick={() => setToggleRegisterModal(true)}
                >
                  New Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {toggleRegisterModal && (
        <CommonModal
          title="Create an Account"
          body={
            <Register
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleRegisterSuccessModal={setToggleRegisterSuccessModal}
              setToggleLoginModal={setToggleLoginModal}
            />
          }
        />
      )}
      {toggleRegisterSuccessModal && (
        <CommonModal
          body={
            <RegisterSuccessModal
              setToggleRegisterSuccessModal={setToggleRegisterSuccessModal}
              setToggleLoginModal={setToggleLoginModal}
            />
          }
        />
      )}
      {toggleLoginModal && (
        <CommonModal
          title="Welcome Back"
          body={
            <Login
              setToggleLoginModal={setToggleLoginModal}
              setToggleLoginSuccessModal={setToggleLoginSuccessModal}
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleForgotPasswordModal={setToggleForgotPasswordModal}
            />
          }
        />
      )}
      {toggleForgotPasswordModal && (
        <CommonModal
          title="
          Enter your email and we will send you a link to reset your password."
          body={
            <ForgotPasswordModal
              setToggleForgotPasswordModal={setToggleForgotPasswordModal}
              setToggleLoginModal={setToggleLoginModal}
            />
          }
        />
      )}
      {toggleResetPasswordModal && (
        <CommonModal
          title="
          Reset Your Password"
          body={
            <ResetPasswordModal
              setToggleResetPasswordModal={setToggleResetPasswordModal}
            />
          }
        />
      )}
      {toggleLoginSuccessModal && (
        <CommonModal
          body={
            <LoginSuccessModal
              setToggleLoginSuccessModal={setToggleLoginSuccessModal}
              setProfile={setProfile}
            />
          }
        />
      )}

      {profile && (
        <CommonModal
          body={
            <ProfileModal
              setProfile={setProfile}
              isLoading={isLoading}
              userDetails={userDetails}
            />
          }
        />
      )}
    </>
  );
};

export default Navbar;
