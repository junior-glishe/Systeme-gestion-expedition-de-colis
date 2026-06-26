// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";

// // Garde de route : exige une session + un ou plusieurs rôles autorisés.
// export default function ProtectedRoute({ roles }) {
//   const { isAuthenticated, user } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }
//   if (roles && roles.length > 0 && !roles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//   return <Outlet />;
// }


import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  return <Outlet />;
}