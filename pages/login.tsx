import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "../src/components/commons/Buttons";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/client";
import { Input } from "../src/components/commons/Input";
import { ErrorMessage } from "../src/components/commons/ErrorMessage";

import { Validations } from "../src/components/utils/formValidation";
import { SignInResponse, SetStateAction, FormValues } from "../src/types";

const Login = (): JSX.Element => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verifyPassword = async () => {
    try {
      setIsLoading(true);
      setResponse("");
      const emailAddress = getValues("emailAddress");
      const password = getValues("password");

      await signIn("credentials", {
        redirect: false,
        callbackUrl: `${window.location.origin}`,
        emailAddress,
        password,
      }).then((response: SignInResponse | SetStateAction<any>) => {
        setResponse(response.error);
        setIsLoading(false);
        router.push("/");
        // if (response.url) {
        //   router.push(response.url);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                  Login
                </h1>
              </div>
              <div>
                <form onSubmit={handleSubmit(verifyPassword)}>
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
                      {...register("password", Validations.passwordLogin)}
                      errorText={errors.password?.message}
                    />
                  </div>
                  <ErrorMessage message={response || ""} />
                  <div className="flex flex-column justify-center items-center pt-9">
                    <Button isLoading={isLoading}>Login</Button>
                  </div>
                  <div className="text-center mt-8 mb-16 font-medium text-gray-400">
                    <div className="">
                      <p className="inline">Don’t have an account? </p>
                      <Link href="/signup">
                        <p className="text-yellow-300 font-demibold cursor-pointer underline inline">
                          Sign up here.
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

export default Login;
