import React, { lazy, Suspense, useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/ResumeNew"));
const SupercapacitorsBackupController = lazy(() =>
  import("./components/Projects/SupercapacitorsBackupController")
);
const ICM20948 = lazy(() => import("./components/Projects/ICM20948"));
const DRV8701 = lazy(() => import("./components/Projects/DRV8701"));
const DRV8243 = lazy(() => import("./components/Projects/DRV8243"));
const Octopus = lazy(() => import("./components/Projects/Octopus"));
const LeoGV = lazy(() => import("./components/Projects/LeoGV"));
const LeoGVSenna = lazy(() => import("./components/Projects/LeoGVSenna"));
const LeoGVCannon = lazy(() => import("./components/Projects/LeoGVCannon"));

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Suspense fallback={<div role="status">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Project" element={<Projects />} />
            <Route path="/About" element={<About />} />
            <Route path="/Resume" element={<Resume />} />
            <Route path="/project/SupercapacitorsBackupController" element={<SupercapacitorsBackupController />} />
            <Route path="/project/ICM20948" element={<ICM20948 />} />
            <Route path="/project/DRV8701" element={<DRV8701 />} />
            <Route path="/project/DRV8243" element={<DRV8243 />} />
            <Route path="/project/Octopus" element={<Octopus />} />
            <Route path="/project/LeoGV" element={<LeoGV />} />
            <Route path="/project/LeoGV/Senna" element={<LeoGVSenna />} />
            <Route path="/project/LeoGV/Cannon" element={<LeoGVCannon />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;