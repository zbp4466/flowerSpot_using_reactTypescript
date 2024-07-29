import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ProgressBar from "./components/ProgressBar";
import { useEffect, useState } from "react";
import {
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
  routesForPublic,
} from "./routes/RoutesList";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/createSlice/authSlice";
// import { isMobile } from "react-device-detect";

function App() {
  // const [progressBar, setProgressBar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    console.log("storedUserDetails :>> ", storedUserDetails);
    if (storedUserDetails) {
      dispatch(setUserDetails(JSON.parse(storedUserDetails)));
    }
    setIsLoading(false);
  }, []);

  // if (isLoading) {
  //   return <ProgressBar />;
  // }

  return (
    <>
      {isLoading ? (
        <ProgressBar />
      ) : (
        <BrowserRouter>
          <Navbar setIsLoading={setIsLoading} isLoading={isLoading} />
          <Toaster />
          <Routes>
            {routesForPublic.map((elem, index) => {
              return (
                <Route key={index} path={elem.path} element={elem.element} />
              );
            })}
            {routesForAuthenticatedOnly.map((elem, index) => {
              return (
                <Route
                  key={index}
                  path={elem.path}
                  element={<ProtectedRoutes>{elem.element}</ProtectedRoutes>}
                />
              );
            })}
            {
              <Route>
                {routesForNotAuthenticatedOnly.map((elem, index) => {
                  return (
                    <Route
                      key={index}
                      path={elem.path}
                      element={<PublicRoutes>{elem.element}</PublicRoutes>}
                    />
                  );
                })}
              </Route>
            }
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
