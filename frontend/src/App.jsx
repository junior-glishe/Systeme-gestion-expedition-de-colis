import { Routes, Route, Navigate } from "react-router-dom";

import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import Technology from "./components/landing/Technology";
import Steps from "./components/landing/Steps";
import Metrics from "./components/landing/Metrics";
import Testimonials from "./components/landing/Testimonials";
import CallToAction from "./components/landing/CallToAction";
import Footer from "./components/landing/Footer";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./routes/ProtectedRoute";
import { ROLES } from "./contexts/AuthContext";

import { chauffeurRoutes } from "./pages/Chauffeur";
import { adminRoutes } from "./pages/Admin";
import { agentRoutes } from "./pages/Agent";
import { ChauffeurLayout, AdminLayout, AgentLayout } from "./components/layout";

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
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin */}
      <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {adminRoutes.map(({ path, element: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
      </Route>

      {/* Agent d'expédition */}
      <Route element={<ProtectedRoute roles={[ROLES.AGENT]} />}>
        <Route path="/agent" element={<AgentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {agentRoutes.map(({ path, element: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
      </Route>

      {/* Chauffeur */}
      <Route element={<ProtectedRoute roles={[ROLES.CHAUFFEUR]} />}>
        <Route path="/chauffeur" element={<ChauffeurLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {chauffeurRoutes.map(({ path, element: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
