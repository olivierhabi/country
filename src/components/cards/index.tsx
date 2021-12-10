import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingSkeleton from "./LoadingSkeleton";
import { ToastContainer, toast } from "react-toastify";
import formatPopulation from "../../helpers/formatPopulation";
import { route } from "next/dist/server/router";

const Index = (props: any) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (props.loading && props.countries && props.countries.length === 0) {
    return <LoadingSkeleton />;
  }
  if (!props.loading && props.countries && props.countries.length === 0) {
    return <div>Please add Country!</div>;
  }
  if (props.countries.status === 404) {
    return <div>Search not Found Try another one!</div>;
  }

  const updateDataList = async () => {
    const { data } = await props.listData();
    props.setList(data);
  };

  const addToList = async (country: Array<string>) => {
    const res = await fetch(`/api/list`, {
      method: "POST",
      body: JSON.stringify({
        country,
        user: props.session.session.user.email,
        status:
          router.route === "/"
            ? "list"
            : router.route === "/to-visit"
            ? "tovisit"
            : router.route === "/visited"
            ? "visited"
            : null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResp = await res.json();
    if (dataResp.status === "success")
      props.setCca2list((prevState: Array<string>) => [
        dataResp.data.country.cca2,
        ...prevState,
      ]);
    await updateDataList();
  };
  const foundOnMyList = (country: string) => {
    const find =
      props.cca2list &&
      props.cca2list.find((element: string) => element === country);
    return find;
  };

  const deleteOnTheList = async (country: string) => {
    const find =
      props.myList &&
      props.myList.find((element: any) => element.country.cca2 === country);
    if (find) {
      const res = await fetch(`/api/list/${find.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResp = await res.json();
      if (dataResp.status === "200")
        props.setCca2list((prevState: Array<string>) =>
          prevState.filter((i: string) => i !== country)
        );
      await updateDataList();
    }
  };

  const onDelete = (e: React.SyntheticEvent, country: any) => {
    e.stopPropagation();
    setIsLoading(true);
    deleteOnTheList(country.cca2);
  };
  const onAddList = (e: React.SyntheticEvent, country: any) => {
    e.stopPropagation();
    addToList(country);
  };
  return (
    <>
      <div className="container mt-8">
        <div className="flex flex-wrap flex-col md:flex-row items-center mx-10">
          {props.countries &&
            props.countries.map((country: any) => {
              return (
                <div
                  key={country.name.common}
                  onClick={() => {
                    props.setSelected(country);
                    props.toSingle();
                  }}
                  className="bg-white md:bg-gray-100 md:mr-10 dark:bg-gray-700 rounded-xl mb-7 w-[370px] sm:w-[400px] md:w-[240px] lg:w-[240px]"
                >
                  <div className="flex flex-col justify-between rounded-xl shadow-lg h-[500px] sm:h-[535px] md:h-[400px]">
                    <div className="h-[240px] sm:h-[270px] md:h-[159.75px] relative">
                      <Image
                        src={country.flags.png}
                        alt="Picture of the user"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-sm md:rounded-xl"
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
                          className="text-[20px] sm:text-[25px]  md:text-[18px] font-roman"
                          style={{
                            fontWeight: "800",
                          }}
                        >
                          {country.name.common}
                        </div>
                        <div
                          className="flex flex-col space-y-2.5 font-roman pt-5 text-[18px] md:text-[14px]"
                          style={{
                            fontWeight: "500",
                          }}
                        >
                          <div>
                            Population: {formatPopulation(country.population)}
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
                        <button
                          disabled={!foundOnMyList(country.cca2)}
                          onClick={(e) => onDelete(e, country)}
                          className="bg-gray-300 h-10 w-10 rounded-full"
                        >
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
                            onClick={(e) => onAddList(e, country)}
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
    </>
  );
};

export default Index;
