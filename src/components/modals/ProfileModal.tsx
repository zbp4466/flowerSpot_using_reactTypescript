import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/profile.svg";
import CommonButton from "../CommonButton";
import cancelIcon from "../../assets/cancel.svg";
import axios from "axios";
import Loader from "../Loader";
import { SxProps, Theme } from "@mui/system";
import { useAppDispatch } from "../../redux/hooks/hook";
import { removeUserDetails } from "../../redux/reducers/authReducer";
// import { useDispatch } from "react-redux";
// import { removeUserDetails } from "../../redux/actions/authAction";

interface ProfileProps {
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  userDetails: any | undefined;
}

const ProfileModal: React.FC<ProfileProps> = (props) => {
  const dispatch = useAppDispatch();

  const { setProfile, isLoading, userDetails } = props;

  const onClickLogoutButton = () => {
    localStorage.removeItem("token");
    dispatch(removeUserDetails());
    setProfile(false);
  };
  const onClickCancelProfileModal = () => {
    setProfile(false);
  };

  const buttonSx: SxProps<Theme> = {
    backgroundColor: "#DF9186",
    "&:hover": {
      backgroundColor: "#DF9186",
    },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile-main-container">
          <div className="cancel-box  w-fit  absolute right-2 top-2">
            <img
              className="w-8 text-light-gray hover:cursor-pointer"
              src={cancelIcon}
              alt=""
              onClick={onClickCancelProfileModal}
            />
          </div>
          <div className="profile-modal-container  flex flex-col gap-10 ">
            <div className="profile-img-and-name flex  gap-5  ">
              <div className="profile-img">
                <img src={profileIcon} alt="" />
              </div>
              <div className="name-and-sightings   flex flex-col justify-end">
                <h1 className="text-2xl">
                  {userDetails?.first_name}
                  {"  "} {userDetails?.last_name}
                </h1>
                <p className=" text-light-gray">47 Sightings</p>
              </div>
            </div>
            <div className="profile-info flex flex-col gap-5  b w-96">
              <div className="first-name  flex flex-col gap-2">
                <p className="text-sm text-light-gray">First Name</p>
                <h1 className="text-lg">{userDetails?.first_name}</h1>
              </div>
              <div className="last-name flex flex-col gap-2">
                <p className="text-sm text-light-gray">Last Name</p>
                <h1 className="text-lg">{userDetails?.last_name}</h1>
              </div>
              <div className="date-of-birth flex flex-col gap-2">
                <p className="text-sm text-light-gray">Date of Birth</p>
                <h1 className="text-lg">May 20, 1980</h1>
              </div>
              <div className="email-address flex flex-col gap-2">
                <p className="text-sm text-light-gray">Email Address</p>
                <h1 className="text-lg">JohnDoe@gmail.com</h1>
              </div>
            </div>
            <div className="logout-btn flex justify-center">
              <CommonButton
                text="Logout"
                type="submit"
                variant="contained"
                onClick={onClickLogoutButton}
                sx={buttonSx}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
