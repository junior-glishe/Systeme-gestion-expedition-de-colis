import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] font-['Inter',sans-serif]">
      {/* Page Content */}
      <Outlet />
    </div>
  );
}
