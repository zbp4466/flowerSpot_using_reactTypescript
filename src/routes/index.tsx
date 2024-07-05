import React from "react";

import Flowers from "../pages/flowers";
import LatestSightings from "../pages/latestSightings";
import Favorites from "../pages/favorites";
import { Navigate } from "react-router-dom";

export const routesForPublic = [
  { path: "/flowers", element: <Flowers /> },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
export const routesForAuthenticatedOnly = [
  { path: "/latestSightings", element: <LatestSightings /> },
  { path: "/favorites", element: <Favorites /> },
];
