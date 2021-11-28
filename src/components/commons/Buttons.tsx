import React from "react";
import { Spinner } from "./Spinner";

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    isLoading?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, isLoading = false, ...rest }, ref) => {
  return (
    <button
      style={{
        width: "60%",
        height: "47px",
      }}
      ref={ref}
      {...rest}
      disabled={isLoading}
      className="text-lg text-white font-bold font-roman mx-auto bg-yellow-400 border border-transparent shadow-sm hover:bg-yellow-default focus:outline-none"
      type="submit"
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
