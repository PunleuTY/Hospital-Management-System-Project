import React from "react";

export default function Textarea({
  className = "",
  placeholder,
  rows,
  ...props
}) {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none ${className}`}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  );
}
