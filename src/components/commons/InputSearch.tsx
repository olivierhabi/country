import { ErrorMessage } from "./ErrorMessage";
import React from "react";
import { forwardRef } from "react";
import clsx from "clsx";

const InputSearch = React.forwardRef<
  HTMLInputElement,
  {
    label?: string;
    errorText?: string;
    type?: string;
    placeholder?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ type = "text", label, errorText, placeholder, ...rest }, ref) => {
  return (
    <>
      {label && (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current md:text-black text-gray-400 dark:text-white h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M15.18 16.594A9.001 9.001 0 013.198 3.198 9 9 0 0116.594 15.18l6.874 6.874a1 1 0 01-1.414 1.415l-6.874-6.875zM4.612 14.512a7 7 0 119.9 0l-.006.006a7 7 0 01-9.894-.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              style={{
                fontSize: "18px",
              }}
              className={`h-[65px] md:h-[50px] md:bg-gray-100 shadow-sm pl-14 font-roman text-black dark:text-white bg-white dark:bg-gray-600 block w-full sm:text-sm rounded md:rounded-lg focus:outline-none placeholder-gray-400 md:placeholder-black dark:placeholder-white ${clsx(
                "border-gray-200",
                errorText && "border-red-500"
              )}`}
              ref={ref}
              placeholder={placeholder}
              type={type}
              {...rest}
            />
          </div>
        </>
      )}
      <ErrorMessage message={errorText || ""} />
    </>
  );
});

InputSearch.displayName = "InputSearch";

export { InputSearch };
