import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const Index = (props: any) => {
  if (props.loading && props.countries && props.countries.length === 0) {
    return <LoadingSkeleton />;
  }
  if (!props.loading && props.countries && props.countries.length === 0) {
    return <div>Please add Country!</div>;
  }
  if (props.countries.status === 404) {
    return <div>Search not Found Try another one!</div>;
  }
  const addToList = async (country: Array<string>) => {
    const res = await fetch(`/api/list`, {
      method: "POST",
      body: JSON.stringify(country),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success")
      props.setCca2list((prevState: Array<string>) => [
        data.data.country.cca2,
        ...prevState,
      ]);
  };
  const foundOnMyList = (country: string) => {
    const find =
      props.cca2list &&
      props.cca2list.find((element: string) => element === country);
    return find;
  };
  return (
    <>
      <div className="container mt-8 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {props.countries &&
            props.countries.map((country: any) => {
              function numFormatter(num: number) {
                if (num >= 1000000000) {
                  return (num / 1000000000).toFixed(1) + " billion";
                } else if (num >= 1000000) {
                  return (num / 1000000).toFixed(1) + " million";
                } else if (num >= 1000) {
                  return (num / 1000).toFixed(1) + " thousands";
                } else if (num < 1000) {
                  return num.toFixed(1) + " hundred";
                } else {
                  return num;
                }
              }
              return (
                <div
                  key={country.name.common}
                  className="w-full md:w-1/2 lg:w-60 bg-gray-100 dark:bg-gray-700 rounded-xl mr-10 mb-7"
                >
                  <div className="flex flex-col justify-between rounded-xl shadow-lg">
                    <div
                      style={{
                        height: "159.75px",
                      }}
                      className="relative"
                    >
                      <Image
                        src={country.flags.png}
                        alt="Picture of the user"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>
                    <div
                      className="flex flex-col justify-between"
                      style={{
                        height: "240.25px",
                      }}
                    >
                      <div className="flex flex-col px-5 pt-5">
                        <div
                          className="font-roman"
                          style={{
                            fontSize: "18px",
                            fontWeight: "800",
                          }}
                        >
                          {country.name.common}
                        </div>
                        <div
                          className="flex flex-col space-y-2.5 font-roman pt-5"
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          <div>
                            Population: {numFormatter(country.population)}
                          </div>
                          <div>Capital : {country.capital}</div>
                          <div>
                            Currency :{" "}
                            {country.currencies &&
                              Object.keys(country.currencies).map(
                                (value, index) => {
                                  return (
                                    <>
                                      {index !== 0 ? "," : null}
                                      {value}
                                    </>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end m-2.5">
                        <button className="bg-gray-300 h-10 w-10 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="21"
                            className="mx-auto"
                            fill="none"
                            viewBox="0 0 16 21"
                          >
                            <path
                              fill="#fff"
                              d="M6 .25a.75.75 0 00-.75.75v.75H1a.75.75 0 000 1.5h14a.75.75 0 000-1.5h-4.25V1A.75.75 0 0010 .25H6zM6 8.65a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7A.75.75 0 016 8.65zM10.75 9.4a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7z"
                            ></path>
                            <path
                              fill="#fff"
                              fillRule="evenodd"
                              d="M1.991 5.917a.75.75 0 01.746-.667h10.526a.75.75 0 01.746.667l.2 1.802c.363 3.265.363 6.56 0 9.826l-.02.177a2.853 2.853 0 01-2.44 2.51 27.04 27.04 0 01-7.498 0 2.853 2.853 0 01-2.44-2.51l-.02-.177a44.489 44.489 0 010-9.826l.2-1.802zm1.417.833l-.126 1.134a42.99 42.99 0 000 9.495l.02.177a1.353 1.353 0 001.157 1.191c2.35.329 4.733.329 7.082 0a1.353 1.353 0 001.157-1.19l.02-.178c.35-3.155.35-6.34 0-9.495l-.126-1.134H3.408z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                        {foundOnMyList(country.cca2) ? (
                          <button
                            disabled={true}
                            className="h-10 w-10 rounded-full ml-5 bg-green-default"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="12"
                              className="mx-auto"
                              fill="none"
                              viewBox="0 0 18 12"
                            >
                              <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M17.04.626a1 1 0 010 1.414l-9.333 9.334a1 1 0 01-1.414 0L.96 6.04a1 1 0 011.414-1.414L7 9.252 15.626.626a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() => addToList(country)}
                            className="h-10 w-10 rounded-full ml-5 bg-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="12"
                              className="mx-auto"
                              fill="none"
                              viewBox="0 0 18 12"
                            >
                              <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M17.04.626a1 1 0 010 1.414l-9.333 9.334a1 1 0 01-1.414 0L.96 6.04a1 1 0 011.414-1.414L7 9.252 15.626.626a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Index;
