import { ErrorMessage } from "./ErrorMessage";
import React from "react";
import { forwardRef } from "react";
import clsx from "clsx";

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    errorText?: string;
    type?: string;
    placeholder?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ type = "text", label, errorText, placeholder, ...rest }, ref) => {
  return (
    <>
      {label && (
        <>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-base text-black">
              <div className="inputField">
                <div className="pb-2">{label}</div>
                <input
                  style={{
                    height: "50px",
                  }}
                  className={`rounded-xl bg-gray-100  border w-full px-4 py-3 hover:shadow-sm  focus:bg-white focus:outline-none ${clsx(
                    "border-gray-200",
                    errorText && "border-red-500"
                  )}`}
                  ref={ref}
                  placeholder={placeholder}
                  type={type}
                  {...rest}
                />
              </div>
            </label>
          </div>
          <ErrorMessage message={errorText || ""} />
        </>
      )}
    </>
  );
});

Input.displayName = "Input";

export { Input };
