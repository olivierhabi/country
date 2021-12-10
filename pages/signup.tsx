import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "../src/components/commons/Buttons";
import { useForm } from "react-hook-form";
import { CountryDropdown } from "react-country-region-selector";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import clsx from "clsx";

import { Input } from "../src/components/commons/Input";
import { ErrorMessage } from "../src/components/commons/ErrorMessage";

import { Validations } from "../src/components/utils/formValidation";
import { ResponseUser, FormValues } from "../src/types";
import "react-datepicker/dist/react-datepicker.css";

const Signup = (): JSX.Element => {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState<
    | Date
    | [Date | null, Date | null]
    | null
    | React.Ref<{ className: string; innerRef: any }>
  >(new Date());

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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
      const firstName = getValues("firstName");
      const lastName = getValues("lastName");
      const birthdate = getValues("birthdate");
      const country = getValues("country");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: emailAddress,
          password,
          firstName,
          lastName,
          birthdate,
          country,
        }),
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
      <div className="pt-6" style={{ backgroundColor: "#FEF9F0" }}>
        <div className="">
          <div className="mx-auto max-w-screen-xl pt-16">
            <div className="mx-auto w-[85%] md:w-[50%] max-w-[450px] min-w-[200px] min bg-white rounded border border-gray-200 pt-10 px-10">
              <div className="text-center">
                <h1 className="text-2xl text-black text-center md:text-3xl font-bold font-roman mb-5">
                  Signup
                </h1>
              </div>
              <div>
                <form onSubmit={handleSubmit(signUp)}>
                  <div className="flex flex-col">
                    <div className="">
                      <Input
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        {...register("firstName", Validations.firstName)}
                        errorText={errors.firstName?.message}
                      />
                    </div>
                    <div className="">
                      <Input
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName", Validations.lastName)}
                        errorText={errors.lastName?.message}
                      />
                    </div>
                    <div>
                      <Input
                        label="Email"
                        type="email"
                        placeholder="Your email address"
                        {...register("emailAddress", Validations.emailAddress)}
                        errorText={errors.emailAddress?.message}
                      />
                    </div>
                    <div className="mt-5">
                      <CountryDropdown
                        classes={`mb-2 font-semibold text-base text-gray-900 bg-gray-100 h-[50px] rounded-xl border w-full px-4 py-3 hover:shadow-sm  focus:bg-white focus:outline-none ${clsx(
                          "border-gray-200",
                          errors.birthdate?.message && "border-red-500"
                        )}`}
                        value={country}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        innerref={{
                          ...register("country", Validations.country),
                        }}
                        onChange={(val: string) => {
                          setValue("country", val);
                          setCountry(val);
                        }}
                      />
                      <ErrorMessage message={errors.country?.message || ""} />
                    </div>
                    <div className="mt-5">
                      <div className="pb-2 font-semibold text-base text-black">
                        Date of Birth
                      </div>

                      <DatePicker
                        className={`mb-2 font-semibold text-base text-gray-900 bg-gray-100 h-[50px] rounded-xl border w-full px-4 py-3 hover:shadow-sm  focus:bg-white focus:outline-none ${clsx(
                          "border-gray-200",
                          errors.birthdate?.message && "border-red-500"
                        )}`}
                        selected={startDate as Date}
                        onKeyDown={(e) => e.preventDefault()}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        innerref={{
                          ...register("birthdate", Validations.birthdate),
                        }}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={35}
                        scrollableYearDropdown
                        onChange={(date: Date) => {
                          setValue("birthdate", date as Date | null | any);
                          setStartDate(date!);
                        }}
                      />
                      <ErrorMessage message={errors.birthdate?.message || ""} />
                    </div>
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
