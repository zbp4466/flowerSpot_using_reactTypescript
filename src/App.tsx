import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Flowers from "./pages/flowers";
import LatestSightings from "./pages/latestSightings";
import Favorites from "./pages/favorites";
import { Toaster } from "react-hot-toast";
import ProgressBar from "./components/ProgressBar";
import { useState } from "react";

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
            <Route
              path="/flowers"
              element={<Flowers progressBar={progressBar} />}
            />
            <Route path="/latestSightings" element={<LatestSightings />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
