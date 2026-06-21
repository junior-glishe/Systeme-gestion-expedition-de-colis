import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, ChevronDown, X } from "lucide-react";

export default function Sidebar({ menuGroups, isOpen, onClose }) {
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = useState(menuGroups[0]?.label ?? null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0 h-screen
          w-64 bg-gradient-to-b from-[#0f172a] to-[#1a253a]
          border-r border-gray-800
          overflow-y-auto
          transition-all duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff7a30] to-[#ff5a0a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <span className="text-white font-bold text-lg">TrackPulse</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="px-4 py-6 space-y-2 pb-24">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <button
                onClick={() =>
                  setExpandedGroup(
                    expandedGroup === group.label ? null : group.label
                  )
                }
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
              >
                <span>{group.label}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedGroup === group.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedGroup === group.label && (
                <div className="space-y-1 mt-2">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `
                          flex items-center gap-3 px-4 py-2.5 rounded-lg
                          text-sm font-medium transition-all
                          ${
                            isActive
                              ? "bg-[#ff7a30] text-white shadow-lg shadow-[#ff7a30]/30"
                              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          }
                        `
                        }
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gradient-to-t from-[#0f172a] to-transparent">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
