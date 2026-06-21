import { Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Technology from "./components/Technology";
import Steps from "./components/Steps";
import Metrics from "./components/Metrics";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";


function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Technology />
      <Steps />
      <Metrics />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}