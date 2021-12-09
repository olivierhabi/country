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
import { useStore } from "../src/contexts/hooks";
import { TOSINGLE, TOLIST } from "../src/contexts/constants";

// export async function getServerSideProps(context: any) {
//   const { req } = context;
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: { destination: "/login" },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

export enum ListViewSteps {
  LIST,
  SINGLE,
}

const Home = (): JSX.Element | null => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [countries, setCountry] = useState<any>([]);
  const [myList, setList] = useState<any>([]);
  const [cca2list, setCca2list] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState({
    name: {
      common: "DR Congo",
      official: "Democratic Republic of the Congo",
      nativeName: {
        fra: {
          official: "République démocratique du Congo",
          common: "RD Congo",
        },
        kon: {
          official: "Repubilika ya Kongo Demokratiki",
          common: "Repubilika ya Kongo Demokratiki",
        },
        lin: {
          official: "Republiki ya Kongó Demokratiki",
          common: "Republiki ya Kongó Demokratiki",
        },
        lua: {
          official: "Ditunga dia Kongu wa Mungalaata",
          common: "Ditunga dia Kongu wa Mungalaata",
        },
        swa: {
          official: "Jamhuri ya Kidemokrasia ya Kongo",
          common: "Jamhuri ya Kidemokrasia ya Kongo",
        },
      },
    },
    tld: [".cd"],
    cca2: "CD",
    ccn3: "180",
    cca3: "COD",
    cioc: "COD",
    independent: true,
    status: "officially-assigned",
    unMember: true,
    currencies: {
      CDF: {
        name: "Congolese franc",
        symbol: "FC",
      },
    },
    idd: {
      root: "+2",
      suffixes: ["43"],
    },
    capital: ["Kinshasa"],
    altSpellings: [
      "CD",
      "DR Congo",
      "Congo-Kinshasa",
      "Congo, the Democratic Republic of the",
      "DRC",
    ],
    region: "Africa",
    subregion: "Middle Africa",
    languages: {
      fra: "French",
      kon: "Kikongo",
      lin: "Lingala",
      lua: "Tshiluba",
      swa: "Swahili",
    },
    translations: {
      ara: {
        official: "جمهورية الكونغو الديمقراطية",
        common: "الكونغو",
      },
      ces: {
        official: "Demokratická republika Kongo",
        common: "DR Kongo",
      },
      cym: {
        official: "Gweriniaeth Ddemocrataidd Congo",
        common: "Gweriniaeth Ddemocrataidd Congo",
      },
      deu: {
        official: "Demokratische Republik Kongo",
        common: "Kongo (Dem. Rep.)",
      },
      est: {
        official: "Kongo Demokraatlik Vabariik",
        common: "Kongo DV",
      },
      fin: {
        official: "Kongon demokraattinen tasavalta",
        common: "Kongon demokraattinen tasavalta",
      },
      fra: {
        official: "République démocratique du Congo",
        common: "Congo (Rép. dém.)",
      },
      hrv: {
        official: "Demokratska Republika Kongo",
        common: "Kongo, Demokratska Republika",
      },
      hun: {
        official: "Kongói Demokratikus Köztársaság",
        common: "Kongói Demokratikus Köztársaság",
      },
      ita: {
        official: "Repubblica Democratica del Congo",
        common: "Congo (Rep. Dem.)",
      },
      jpn: {
        official: "コンゴ民主共和国",
        common: "コンゴ民主共和国",
      },
      kor: {
        official: "콩고 민주 공화국",
        common: "콩고 민주 공화국",
      },
      nld: {
        official: "Democratische Republiek Congo",
        common: "Congo (DRC)",
      },
      per: {
        official: "جمهوری دموکراتیک کنگو",
        common: "کنگو دموکراتیک",
      },
      pol: {
        official: "Demokratyczna Republika Konga",
        common: "Demokratyczna Republika Konga",
      },
      por: {
        official: "República Democrática do Congo",
        common: "República Democrática do Congo",
      },
      rus: {
        official: "Демократическая Республика Конго",
        common: "Демократическая Республика Конго",
      },
      slk: {
        official: "Konžská demokratická republika",
        common: "Kongo",
      },
      spa: {
        official: "República Democrática del Congo",
        common: "Congo (Rep. Dem.)",
      },
      swe: {
        official: "Demokratiska republiken Kongo",
        common: "Kongo-Kinshasa",
      },
      urd: {
        official: "جمہوری جمہوریہ کانگو",
        common: "کانگو",
      },
      zho: {
        official: "刚果民主共和国",
        common: "民主刚果",
      },
    },
    latlng: [0, 25],
    landlocked: false,
    borders: ["AGO", "BDI", "CAF", "COG", "RWA", "SSD", "TZA", "UGA", "ZMB"],
    area: 2344858,
    demonyms: {
      eng: {
        f: "Congolese",
        m: "Congolese",
      },
      fra: {
        f: "Congolaise",
        m: "Congolais",
      },
    },
    flag: "🇨🇩",
    maps: {
      googleMaps: "https://goo.gl/maps/KfhNVn6VqdZXWu8n9",
      openStreetMaps: "https://www.openstreetmap.org/relation/192795",
    },
    population: 89561404,
    gini: {
      "2012": 42.1,
    },
    fifa: "COD",
    car: {
      signs: ["CGO"],
      side: "right",
    },
    timezones: ["UTC+01:00", "UTC+02:00"],
    continents: ["Africa"],
    flags: {
      png: "https://flagcdn.com/w320/cd.png",
      svg: "https://flagcdn.com/cd.svg",
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/cd.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/cd.svg",
    },
    startOfWeek: "monday",
    capitalInfo: {
      latlng: [-4.32, 15.3],
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
            />
          )}
          {state === ListViewSteps.SINGLE && (
            <SingleCountry selected={selected}/>
          )}
        </>
      </DashboardLayout>
    </>
  );
};

export default Home;
