import React from "react";
import Flowers from "../pages/flowers";
import LatestSightings from "../pages/latestSightings";
import FavoriteFlowers from "../pages/favoriteFlowers";
import { Navigate } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";

export const routesForPublic = [
  { path: "/flowers", element: <Flowers /> },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
export const routesForAuthenticatedOnly = [
  { path: "/latestSightings", element: <LatestSightings /> },
  { path: "/favoriteFlowers", element: <FavoriteFlowers /> },
];

export const routesForNotAuthenticatedOnly = [
  {
    path: "/register",
    element: (
      <Register
      // setToggleRegisterModal={() => {}}
      // setToggleRegisterSuccessModal={() => {}}
      // setToggleLoginModal={() => {}}
      />
    ),
  },
  {
    path: "/login",
    element: (
      <Login
      // setToggleLoginModal={() => {}}
      // setToggleLoginSuccessModal={() => {}}
      // setToggleRegisterModal={() => {}}
      // setToggleForgotPasswordModal={() => {}}
      />
    ),
  },
];
