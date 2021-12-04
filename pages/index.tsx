import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import { useSession, getSession } from "next-auth/client";
import { useTheme } from "next-themes";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Cards from "../src/components/cards/index";
import { InputSearch } from "../src/components/commons/InputSearch";
import { Validations } from "../src/components/utils/formValidation";
import { FormSearch } from "../src/types";
import DashboardLayout from "../src/components/DashboardLayout";

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Home = (session: any): JSX.Element | null => {
  const router = useRouter();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [countries, setCountry] = useState<any>([]);
  const [myList, setList] = useState<any>([]);
  const [cca2list, setCca2list] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const { theme, setTheme } = useTheme();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<FormSearch>();

  useEffect(() => {
    setTheme("light");
    setMounted(true);
    (async () => {
      setLoading(true);
      const res = await fetch(`https://restcountries.com/v3.1/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      const myList = await fetch(`/api/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const myListdata = await myList.json();
      setCca2list(myListdata.cca2list);
      setList(myListdata.data);
      setCountry(data);
      setLoading(false);
    })();
  }, []);
  if (!mounted) return null;

  const firterSelection = async (selection: string) => {
    setLoading(true);
    setCountry([]);
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${selection}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setCountry(data);
    setLoading(false);
  };

  const searchInput = async (input: any) => {
    setLoading(true);
    setCountry([]);
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${input.searchInput}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setCountry(data);
    setLoading(false);
  };

  return (
    <>
      <DashboardLayout title={"MY LIST"}>
        <div className="flex flex-row justify-between mt-7 w-full">
          <div
            className=""
            style={{
              width: "400px",
            }}
          >
            <form onSubmit={handleSubmit(searchInput)}>
              <InputSearch
                label={"Search here"}
                type={"text"}
                {...register("searchInput", Validations.searchInput)}
                errorText={errors.searchInput?.message}
                placeholder="Search For a Country ...."
              />
            </form>
          </div>
          <div className="">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  style={{
                    width: "200px",
                    height: "50px",
                    fontSize: "18px",
                  }}
                  className="inline-flex justify-center items-center w-full px-4 py-2 font-roman bg-gray-100 dark:bg-gray-600 text-black dark:text-white rounded-xl  focus:outline-none focus-visible:ring-2"
                >
                  Filter by region
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  style={{
                    width: "200px",
                  }}
                  className="absolute right-0 mt-2 origin-top-right bg-gray-100 dark:bg-gray-600 divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div
                    className="flex flex-col space-y-2 py-5 px-4 font-roman"
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => firterSelection("africa")}
                          className={`cursor-pointer rounded-xl h-10 ${
                            active ? "bg-gray-200" : null
                          }`}
                        >
                          Africa
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => firterSelection("america")}
                          className={`cursor-pointer rounded-xl h-10 ${
                            active ? "bg-gray-200" : null
                          }`}
                        >
                          America
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => firterSelection("asia")}
                          className={`cursor-pointer rounded-xl h-10 ${
                            active ? "bg-gray-200" : null
                          }`}
                        >
                          Asia
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => firterSelection("europe")}
                          className={`cursor-pointer rounded-xl h-10 ${
                            active ? "bg-gray-200" : null
                          }`}
                        >
                          Europe
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => firterSelection("oceania")}
                          className={`cursor-pointer rounded-xl h-10 ${
                            active ? "bg-gray-200" : null
                          }`}
                        >
                          Oceania
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <Cards setCca2list={setCca2list} cca2list={cca2list} myList={myList} loading={loading} countries={countries} />
      </DashboardLayout>
    </>
  );
};

export default Home;
