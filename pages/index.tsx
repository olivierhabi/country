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
import { FormSearch, Session , Sessions} from "../src/types";
import DashboardLayout from "../src/components/DashboardLayout";
import SingleCountry from "../src/components/SingleCountry";
import { useStore } from "../src/contexts/hooks";
import { TOSINGLE, TOLIST } from "../src/contexts/constants";

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

export enum ListViewSteps {
  LIST,
  SINGLE,
}

const Home = (props: Sessions | null): JSX.Element | null => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [countries, setCountry] = useState<any>([]);
  const [myList, setList] = useState<any>([]);
  const [cca2list, setCca2list] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<FormSearch>();

  const listData = async () => {
    const myList = await fetch(`/api/list?type=list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const myListdata = await myList.json();

    return myListdata;
  };

  useEffect(() => {
    setTheme("light");
    setMounted(true);
    (async () => {
      setLoading(true);
      const myListdata = await listData();
      setCca2list(myListdata.cca2list);
      for (var i = 0; i < myListdata.data.length; i++) {
        setCountry((prevState: Array<string>) => [
          myListdata.data[i].country,
          ...prevState,
        ]);
      }
      setList(myListdata.data);
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
  function toSingle() {
    dispatch({
      type: TOSINGLE,
    });
  }

  function toList() {
    dispatch({
      type: TOLIST,
    });
  }
  return (
    <>
      <DashboardLayout
        state={state}
        session={props}
        toSingle={toSingle}
        toList={toList}
        title={"MY LIST"}
      >
        {state === ListViewSteps.LIST && (
          <div className="flex flex-col md:flex-row justify-between pt-7 w-full min-w-[500px]">
            <div className="md:w-[400px] mx-11 h-[50px] mb-7">
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
            <div className="z-10 mx-11">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="w-[200px] h-[65px] md:h-[50px] bg-white md:bg-gray-100 text-[18px] inline-flex justify-center items-center px-4 py-2 font-roman dark:bg-gray-600 text-black dark:text-white rounded md:rounded-lg  focus:outline-none focus-visible:ring-2 shadow-sm">
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
                  <Menu.Items className="absolute w-[200px] right-0 mt-2 origin-top-right md:bg-gray-100 bg-white dark:bg-gray-600 divide-y divide-gray-100 rounded md:rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex flex-col text-[18px] space-y-2 py-5 px-4 font-roman">
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
        )}

        <>
          {state === ListViewSteps.LIST && (
            <Cards
              setCca2list={setCca2list}
              cca2list={cca2list}
              myList={myList}
              loading={loading}
              setList={setList}
              countries={countries}
              listData={listData}
              ListViewSteps={ListViewSteps}
              toSingle={toSingle}
              toList={toList}
              setSelected={setSelected}
              session={props}
            />
          )}
          {state === ListViewSteps.SINGLE && (
            <SingleCountry selected={selected} />
          )}
        </>
      </DashboardLayout>
    </>
  );
};

export default Home;
