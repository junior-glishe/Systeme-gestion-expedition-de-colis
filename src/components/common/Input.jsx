import React from "react";

export default function Input({
  label,
  error,
  icon: Icon,
  className = "",
  required = false,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-[#334155] mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#ff7a30] transition-colors" />
        )}
        <input
          className={`
            w-full 
            ${Icon ? "pl-12" : "pl-4"} 
            pr-4 py-3 
            bg-white/90 border border-[#e2e8f0] rounded-xl 
            text-base outline-none 
            transition-all duration-200 
            focus:ring-2 focus:ring-[#ff7a30]/40 focus:border-[#ff7a30] 
            hover:border-[#cbd5e1] 
            placeholder:text-[#94a3b8]
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500/40" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
