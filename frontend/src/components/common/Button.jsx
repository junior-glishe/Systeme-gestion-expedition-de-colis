import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const variants = {
    primary: "bg-gradient-to-r from-[#0f172a] to-[#1c2942] hover:from-[#1c2942] hover:to-[#2a3a5a] text-white shadow-lg shadow-[#0f172a]/20 hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
