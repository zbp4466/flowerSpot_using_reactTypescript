import { NavLink } from "react-router-dom";
import flower from "../assets/flower.svg";
import Button from "./CommonButton";
import { useState } from "react";
import CommonModal from "./CommonModal";
import Login from "../pages/login";
import CreateAccount from "../pages/createAccount";

const Navbar: React.FC = () => {
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);
  const [toggleRegisterModal, setToggleRegisterModal] =
    useState<boolean>(false);
  console.log("toggleLoginModal :>> ", toggleLoginModal);
  return (
    <>
      <div className="navbar-conatiner font-Montserrat">
        <div className="navbar-box bg-white border-2 flex justify-between items-center h-16">
          <div className="nav-logo  ml-5 flex justify-center items-center gap-3">
            <img src={flower} alt="logo-img" />
            <p className="font-bold text-linear-gradient-dark text-lg">
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
              {/* <Button/> */}
              {/* <button className="text-linear-gradient-2">Login</button> */}
              <button
                className="text-linear-gradient-dark "
                type="button"
                onClick={() => setToggleLoginModal(true)}
              >
                Login
              </button>
              <button
                className="new-account-btn mr-5 w-36 h-10 text-white bg-linear-gradient rounded-full"
                type="button"
                onClick={() => setToggleRegisterModal(true)}
              >
                New Account
              </button>

              {/* <button className="new-account-btn mr-5 w-36 h-10 text-white bg-linear-gradient rounded-full ">
                New Account
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {toggleLoginModal && (
        <CommonModal
          body={<Login setToggleLoginModal={setToggleLoginModal} />}
          onClose={() => setToggleLoginModal(false)}
        />
      )}
      {toggleRegisterModal && (
        <CommonModal
          body={
            <CreateAccount setToggleRegisterModal={setToggleRegisterModal} />
          }
          onClose={() => setToggleRegisterModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
