import React from "react";

export default function Card({
  children,
  className = "",
  padding = true,
  shadow = true,
  border = true,
  ...props
}) {
  return (
    <div
      className={`
        bg-white rounded-xl
        ${padding ? "p-6" : ""}
        ${shadow ? "shadow-sm hover:shadow-md" : ""}
        ${border ? "border border-gray-100" : ""}
        transition-shadow
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
