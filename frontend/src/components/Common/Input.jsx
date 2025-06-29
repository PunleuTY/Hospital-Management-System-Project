import React from "react"

const Input = React.forwardRef(({ className = "", type = "text", placeholder, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        type={type}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  placeholder-gray-400 not-last:${
          icon ? "pl-10" : ""
        } ${className}`}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  )
})

Input.displayName = "Input"

export default Input