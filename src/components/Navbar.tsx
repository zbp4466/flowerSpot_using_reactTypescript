import { NavLink } from "react-router-dom";
import flower from "../assets/flower.svg";
import Button from "./CommonButton";
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
import { setUserDetails } from "../redux/reducers/authReducer";

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
  const [toggleLoginSuccessModal, setToggleLoginSuccessModal] =
    useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <>
      <div className="navbar-conatiner font-Montserrat">
        <div className="navbar-box bg-white border-2 flex justify-between items-center h-16">
          <div className="nav-logo  ml-5 flex justify-center items-center gap-3">
            <img src={flower} alt="logo-img" className="w-10" />
            <p className="font-bold text-linear-gradient-dark text-2xl">
              FlowerSpot
            </p>
          </div>
          <div className="nav-menu flex gap-20 items-center">
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
      </div>

      {toggleRegisterModal && (
        <CommonModal
          body={
            <Register
              setToggleRegisterModal={setToggleRegisterModal}
              setToggleRegisterSuccessModal={setToggleRegisterSuccessModal}
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
          body={
            <Login
              setToggleLoginModal={setToggleLoginModal}
              setToggleLoginSuccessModal={setToggleLoginSuccessModal}
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
