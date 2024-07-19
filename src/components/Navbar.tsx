import { NavLink, useLocation } from "react-router-dom";
import flower from "../assets/image/flower.svg";
import { useEffect, useState } from "react";
import Login from "../pages/login";
import profileIcon from "../assets/image/profile.svg";
import RegisterSuccessModal from "./modals/RegisterSuccessModal";
import LoginSuccessModal from "./modals/LoginSuccessModal";
import ProfileModal from "./modals/ProfileModal";
import axiosInstance from "../config/http.config";
import Register from "../pages/register";
import CommonModal from "./modals/CommonModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import cancelIcon from "../assets/image/cancel.svg";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import { setUserDetails } from "../redux/createSlice/authSlice";
import { isMobile, isBrowser } from "react-device-detect";
import Header from "./Header";

interface NavbarProps {
  setProgressBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const navbarMenu = [
    { url: "/flowers", label: "Flowers" },
    { url: "/latestSightings", label: "Latest Sightings" },
    { url: "/favoriteFlowers", label: "Favorites" },
  ];

  const { setProgressBar } = props;
  const { pathname } = useLocation();
  // console.log("pathname :>> ", pathname);
  const dispatch = useAppDispatch();

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

  const clickDropdownRegister = () => {
    setShowDropdownMenu(false);
  };
  const clickDropdownLogin = () => {
    setShowDropdownMenu(false);
  };

  console.log("isMobile :>> ", isMobile);
  console.log("isBrowser :>> ", isBrowser);

  return (
    <>
      <nav className="bg-white  dark:bg-gray-900 shadow-2xl">
        <div className=" flex   items-center justify-between mx-auto h-16">
          <NavLink
            to="/"
            className="ml-2 sm:ml-5 flex items-center space-x-1 sm:space-x-3 rtl:space-x-reverse"
          >
            <img src={flower} alt="logo-img" className="w-10" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap  text-linear-gradient-dark ">
              FlowerSpot
            </span>
          </NavLink>

          <div
            className="flex items-center lg:gap-10"
            // className="hidden  w-full lg:block md:w-auto"
            id="navbar-default"
          >
            <ul className="hidden lg:flex  lg:gap-5 lg:items-center  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navbarMenu.map((elem, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={elem.url}
                      className={` block  rounded  md:hover:text-linear-gradient-dark  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      {elem.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2 sm:gap-5 ">
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
                  className="profile-img w-12 sm:mr-5 "
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
              className="inline-flex items-center p-2 w-10 h-10 justify-center mr-2 sm:mr-5 text-sm  text-gray-500 rounded-lg lg:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <NavLink
                to="/"
                className=" ml-5 flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={flower} alt="logo-img" className="w-10" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap  text-linear-gradient-dark ">
                  FlowerSpot
                </span>
              </NavLink>
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
                onClick={() => setShowDropdownMenu(false)}
              >
                Flowers
              </NavLink>
              <NavLink
                to="/latestSightings"
                className="text-gray-400 font-medium hover:bg-linear-gradient-dark hover:text-white p-2 rounded-lg ml-5"
                onClick={() => setShowDropdownMenu(false)}
              >
                Latest Sightings
              </NavLink>
              <NavLink
                to="/favoriteFlowers"
                className="text-gray-400 font-medium hover:bg-linear-gradient-dark hover:text-white p-2 rounded-lg ml-5"
                onClick={() => setShowDropdownMenu(false)}
              >
                Favorites
              </NavLink>
              <hr />
              <NavLink
                to="/login"
                className="text-gray-400 font-medium hover:text-linear-gradient-dark  p-2 rounded-lg ml-5"
                // onClick={() => setShowDropdownMenu(false)}
                onClick={clickDropdownLogin}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className=" p-3 w-fit font-medium  bg-linear-gradient-dark text-white  rounded-full  ml-5"
                // onClick={() => setShowDropdownMenu(false)}
                onClick={clickDropdownRegister}
              >
                New Account
              </NavLink>
            </ul>
          </div>
        )}
      </nav>
      {/* <Header /> */}
      {isMobile
        ? pathname === "/register" && (
            <Register
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleRegisterSuccessModal={setToggleRegisterSuccessModal}
              setToggleLoginModal={setToggleLoginModal}
            />
          )
        : toggleRegisterModal && (
            <CommonModal
              body={
                <Register
                  setToggleRegisterModal={setToggleRegisterModal}
                  setToggleRegisterSuccessModal={setToggleRegisterSuccessModal}
                  setToggleLoginModal={setToggleLoginModal}
                />
              }
            />
          )}
      {/* {isBrowser && toggleRegisterModal && (
        <CommonModal
          body={
            <Register
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleRegisterSuccessModal={setToggleRegisterSuccessModal}
              setToggleLoginModal={setToggleLoginModal}
            />
          }
        />
      )} */}
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
      {/* {isBrowser && toggleLoginModal && (
        <CommonModal
          body={
            <Login
              setToggleLoginModal={setToggleLoginModal}
              setToggleLoginSuccessModal={setToggleLoginSuccessModal}
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleForgotPasswordModal={setToggleForgotPasswordModal}
            />
          }
        />
      )} */}

      {isMobile
        ? pathname === "/login" && (
            <Login
              setToggleLoginModal={setToggleLoginModal}
              setToggleLoginSuccessModal={setToggleLoginSuccessModal}
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleForgotPasswordModal={setToggleForgotPasswordModal}
            />
          )
        : toggleLoginModal && (
            <CommonModal
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
      {isMobile
        ? toggleForgotPasswordModal && (
            <ForgotPasswordModal
              setToggleForgotPasswordModal={setToggleForgotPasswordModal}
              setToggleLoginModal={setToggleLoginModal}
            />
          )
        : toggleForgotPasswordModal && (
            <CommonModal
              body={
                <ForgotPasswordModal
                  setToggleForgotPasswordModal={setToggleForgotPasswordModal}
                  setToggleLoginModal={setToggleLoginModal}
                />
              }
            />
          )}
      {isMobile
        ? toggleResetPasswordModal && (
            <ResetPasswordModal
              setToggleResetPasswordModal={setToggleResetPasswordModal}
            />
          )
        : toggleResetPasswordModal && (
            <CommonModal
              body={
                <ResetPasswordModal
                  setToggleResetPasswordModal={setToggleResetPasswordModal}
                />
              }
            />
          )}

      {isMobile
        ? profile && (
            <ProfileModal
              setProfile={setProfile}
              isLoading={isLoading}
              userDetails={userDetails}
            />
          )
        : profile && (
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
