import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "../src/components/commons/Buttons";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { Input } from "../src/components/commons/Input";
import { ErrorMessage } from "../src/components/commons/ErrorMessage";

import { Validations } from "../src/components/utils/formValidation";
import { ResponseUser, FormValues } from "../src/types";

const Signup = (): JSX.Element => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUp = async () => {
    try {
      setIsLoading(true);
      setResponse("");
      const emailAddress = getValues("emailAddress");
      const password = getValues("password");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email: emailAddress, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as ResponseUser;

      setResponse(data.message);
      setIsLoading(false);
      if (data.status === "success") {
        notify();
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const notify = () =>
    toast.success("Redirecting to Login", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <div>
      <div className="pt-6 h-screen" style={{ backgroundColor: "#FEF9F0" }}>
        <div className="">
          <div className="mx-auto max-w-screen-xl pt-16">
            <div
              className="mx-auto bg-white rounded border border-gray-200 pt-10 px-10"
              style={{
                width: "450px",
              }}
            >
              <div className="text-center">
                <h1 className="text-2xl text-black text-center md:text-3xl font-bold font-roman mb-5">
                  Signup
                </h1>
              </div>
              <div>
                <form onSubmit={handleSubmit(signUp)}>
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Your email address"
                      {...register("emailAddress", Validations.emailAddress)}
                      errorText={errors.emailAddress?.message}
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Password"
                      {...register("password", Validations.password)}
                      errorText={errors.password?.message}
                    />
                  </div>
                  <ErrorMessage message={response || ""} />
                  <div className="flex flex-column justify-center items-center pt-9">
                    <Button isLoading={isLoading}>Signup</Button>
                  </div>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <div className="text-center mt-8 mb-16 font-roman text-gray-400">
                    <div className="">
                      <p className="inline">Already have an account </p>
                      <Link href="/login">
                        <p className="text-yellow-300 font-roman cursor-pointer underline inline">
                          Login
                        </p>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
