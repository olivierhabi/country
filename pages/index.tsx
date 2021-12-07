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
import SingleCountry from "../src/components/SingleCountry";

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

const Home = (): JSX.Element | null => {
  const router = useRouter();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [countries, setCountry] = useState<any>([]);
  const [myList, setList] = useState<any>([]);
  const [cca2list, setCca2list] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const { theme, setTheme } = useTheme();
  const [listStep, setListStep] = useState(ListViewSteps.SINGLE);
  const [selected, setSelected] = useState({
    car: {
      side: "right",
      signs: ["PY"],
    },
    idd: {
      root: "+5",
      suffixes: ["95"],
    },
    tld: [".py"],
    area: 406752,
    cca2: "PY",
    cca3: "PRY",
    ccn3: "600",
    cioc: "PAR",
    fifa: "PAR",
    flag: "🇵🇾",
    gini: {
      "2019": 45.7,
    },
    maps: {
      googleMaps: "https://goo.gl/maps/JtnqG73WJn1Gx6mz6",
      openStreetMaps: "https://www.openstreetmap.org/relation/287077",
    },
    name: {
      common: "Paraguay",
      official: "Republic of Paraguay",
      nativeName: {
        grn: {
          common: "Paraguái",
          official: "Tetã Paraguái",
        },
        spa: {
          common: "Paraguay",
          official: "República de Paraguay",
        },
      },
    },
    flags: {
      png: "https://flagcdn.com/w320/py.png",
      svg: "https://flagcdn.com/py.svg",
    },
    latlng: [-23, -58],
    region: "Americas",
    status: "officially-assigned",
    borders: ["ARG", "BOL", "BRA"],
    capital: ["Asunción"],
    demonyms: {
      eng: {
        f: "Paraguayan",
        m: "Paraguayan",
      },
      fra: {
        f: "Paraguayenne",
        m: "Paraguayen",
      },
    },
    unMember: true,
    languages: {
      grn: "Guaraní",
      spa: "Spanish",
    },
    subregion: "South America",
    timezones: ["UTC-04:00"],
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/py.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/py.svg",
    },
    continents: ["South America"],
    currencies: {
      PYG: {
        name: "Paraguayan guaraní",
        symbol: "₲",
      },
    },
    landlocked: true,
    population: 7132530,
    postalCode: {
      regex: "^(\\d{4})$",
      format: "####",
    },
    capitalInfo: {
      latlng: [-25.28, -57.57],
    },
    independent: true,
    startOfWeek: "monday",
    altSpellings: [
      "PY",
      "Republic of Paraguay",
      "República del Paraguay",
      "Tetã Paraguái",
    ],
    translations: {
      ara: {
        common: "باراغواي",
        official: "جمهورية باراغواي",
      },
      ces: {
        common: "Paraguay",
        official: "Paraguayská republika",
      },
      cym: {
        common: "Paraguay",
        official: "Republic of Paraguay",
      },
      deu: {
        common: "Paraguay",
        official: "Republik Paraguay",
      },
      est: {
        common: "Paraguay",
        official: "Paraguay Vabariik",
      },
      fin: {
        common: "Paraguay",
        official: "Paraguayn tasavalta",
      },
      fra: {
        common: "Paraguay",
        official: "République du Paraguay",
      },
      hrv: {
        common: "Paragvaj",
        official: "Republika Paragvaj",
      },
      hun: {
        common: "Paraguay",
        official: "Paraguayi Köztársaság",
      },
      ita: {
        common: "Paraguay",
        official: "Repubblica del Paraguay",
      },
      jpn: {
        common: "パラグアイ",
        official: "パラグアイ共和国",
      },
      kor: {
        common: "파라과이",
        official: "파라과이 공화국",
      },
      nld: {
        common: "Paraguay",
        official: "Republiek Paraguay",
      },
      per: {
        common: "پاراگوئه",
        official: "جمهوری پاراگوئه",
      },
      pol: {
        common: "Paragwaj",
        official: "Republika Paragwaju",
      },
      por: {
        common: "Paraguai",
        official: "República do Paraguai",
      },
      rus: {
        common: "Парагвай",
        official: "Республика Парагвай",
      },
      slk: {
        common: "Paraguaj",
        official: "Paraguajská republika",
      },
      spa: {
        common: "Paraguay",
        official: "República de Paraguay",
      },
      swe: {
        common: "Paraguay",
        official: "Republiken Paraguay",
      },
      urd: {
        common: "پیراگوئے",
        official: "جمہوریہ پیراگوئے",
      },
      zho: {
        common: "巴拉圭",
        official: "巴拉圭共和国",
      },
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<FormSearch>();

  const listData = async () => {
    const myList = await fetch(`/api/list`, {
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
  // console.log(
  //   listStep,
  //   ListViewSteps.LIST,
  //   "_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_=-=-=-=-+_+_++"
  // );

  // console.log(selected && selected.name.common, "============================ SELECYTED")

  return (
    <>
      <DashboardLayout
        ListViewSteps={ListViewSteps}
        setListStep={setListStep}
        listStep={listStep}
        title={"MY LIST"}
      >
        {listStep === ListViewSteps.LIST && (
          <div className="flex flex-row justify-between mt-7 w-full">
            <div className="w-[400px]">
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
            <div className="z-10">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className=" w-[200px] h-[50px] text-[18px] inline-flex justify-center items-center px-4 py-2 font-roman bg-gray-100 dark:bg-gray-600 text-black dark:text-white rounded-xl  focus:outline-none focus-visible:ring-2">
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
                  <Menu.Items className="absolute w-[200px] right-0 mt-2 origin-top-right bg-gray-100 dark:bg-gray-600 divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          {listStep === ListViewSteps.LIST && (
            <Cards
              setCca2list={setCca2list}
              cca2list={cca2list}
              myList={myList}
              loading={loading}
              setList={setList}
              countries={countries}
              listData={listData}
              ListViewSteps={ListViewSteps}
              setListStep={setListStep}
              listStep={listStep}
              setSelected={setSelected}
            />
          )}
          {listStep === ListViewSteps.SINGLE && (
            <SingleCountry selected={selected} />
          )}
        </>
      </DashboardLayout>
    </>
  );
};

export default Home;
