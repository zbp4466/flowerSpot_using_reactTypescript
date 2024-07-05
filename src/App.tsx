import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Flowers from "./pages/flowers";
import LatestSightings from "./pages/latestSightings";
import Favorites from "./pages/favorites";
import { Toaster } from "react-hot-toast";
import ProgressBar from "./components/ProgressBar";
import { useState } from "react";
import { routesForAuthenticatedOnly, routesForPublic } from "./routes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const [progressBar, setProgressBar] = useState<boolean>(false);
  return (
    <>
      {progressBar ? (
        <ProgressBar />
      ) : (
        <BrowserRouter>
          <Navbar setProgressBar={setProgressBar} />
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
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
