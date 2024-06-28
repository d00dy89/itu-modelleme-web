import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import Analysis from "./pages/Analysis";
import Papers from "./pages/Papers";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Forecast" element={<Forecast />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/Papers" element={<Papers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
