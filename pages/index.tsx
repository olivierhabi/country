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
  const [loading, setLoading] = useState<any>(true);
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
      const res = await fetch(`${process.env.COUNTRIES_API}/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCountry(data);
      setLoading(false);
    })();
  }, []);
  if (!mounted) return null;

  const firterSelection = async (selection: string) => {
    setLoading(true);
    setCountry([]);
    const res = await fetch(
      `${process.env.COUNTRIES_API}/region/${selection}`,
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
      `${process.env.COUNTRIES_API}/name/${input.searchInput}`,
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
    <div className="flex flex-row h-full">
      <div
        style={{
          width: "180px",
        }}
        className="flex-none bg-white dark:bg-gray-800 p-8 border-r border-light-blue-500 dark:border-gray-400"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="18"
            className="fill-current text-black dark:text-white"
            fill="red"
            viewBox="0 0 48 18"
          >
            <g clipPath="url(#clip0_2_537)">
              <path d="M40.184.019c-.04.004-.187.018-.33.029-2.22.191-4.282 1.113-5.741 2.572a8.023 8.023 0 00-1.525 2.11c-.488.965-.782 1.981-.916 3.169-.07.634-.06 1.71.025 2.377.525 4.163 3.533 7.084 7.86 7.635.561.072.962.089 1.78.076 1.193-.018 2.117-.123 3.191-.364.7-.156 1.538-.41 1.82-.552a2.32 2.32 0 001.245-1.757c.016-.117.02-1.06.016-3.031l-.006-2.861-.056-.196c-.257-.91-.878-1.502-1.806-1.72-.142-.033-.355-.037-2.67-.043l-2.517-.009v.552c0 .305.01.632.023.726.121.986.772 1.733 1.743 2 .144.042.222.046.834.054l.673.007-.005 1.566-.006 1.566-.216.08c-.599.226-1.276.34-2.124.36-.782.019-1.325-.041-1.93-.208-1.607-.442-2.762-1.586-3.26-3.227a6.864 6.864 0 01-.093-3.428 5.77 5.77 0 01.647-1.548 4.827 4.827 0 013.303-2.23c.35-.06.675-.081 1.09-.069a5.352 5.352 0 012.087.461c.352.159.47.204.64.25.758.201 1.58.001 2.128-.52.072-.07.418-.452.77-.853l.64-.727-.103-.09a7.47 7.47 0 00-1.19-.86C44.98.607 43.379.145 41.739.026A23.263 23.263 0 0040.184.02zM2.082.492A2.33 2.33 0 00.177 2.468C.16 2.585.156 4.402.16 9.123l.006 6.493.058.206c.076.28.267.659.438.87.354.443.834.727 1.41.838.146.027.508.031 2.795.031 1.578 0 2.741-.008 2.914-.02 1.94-.142 3.435-.702 4.412-1.655.38-.372.605-.675.828-1.122.288-.576.44-1.23.465-1.988.016-.582-.044-1.037-.202-1.52-.436-1.33-1.572-2.293-3.079-2.61-.121-.025-.212-.053-.212-.068 0-.012.08-.053.181-.09 1.678-.632 2.618-1.939 2.618-3.641 0-.856-.218-1.65-.626-2.278-.66-1.015-1.883-1.7-3.52-1.976C7.905.47 7.982.472 4.991.468c-2.327-.005-2.772 0-2.91.024zm5.028 3.31c.823.137 1.309.421 1.543.9.105.215.147.423.147.721-.002.836-.426 1.406-1.254 1.684-.1.035-.288.082-.418.105-.22.043-.308.045-1.605.053l-1.374.008V3.75l1.374.008c1.184.006 1.402.013 1.587.044zm.239 6.563c1.142.162 1.735.557 1.949 1.302.04.142.047.21.047.523 0 .422-.027.562-.163.854-.312.665-1.027 1.05-2.15 1.163-.122.012-.784.02-1.548.02H4.15v-3.912l1.487.008c1.204.006 1.53.015 1.713.041zM21.899.492c-.5.09-.986.354-1.307.704a2.56 2.56 0 00-.401.589c-.03.064-.943 2.424-2.03 5.246l-3.006 7.793a891.987 891.987 0 00-1.04 2.7c-.01.035.072.037 1.544.037 1.317 0 1.578-.004 1.72-.03.752-.145 1.35-.593 1.673-1.256.073-.148.278-.757.747-2.202 3.067-9.459 2.793-8.633 2.853-8.633.055 0-.062-.352 2.86 8.602.363 1.116.696 2.103.74 2.196.152.327.41.644.71.868.193.147.55.32.802.387l.206.058 1.663.006c.913.002 1.66 0 1.66-.006s-.491-1.309-1.092-2.898L27.247 6.85c-1.024-2.706-1.901-5.003-1.95-5.103-.285-.593-.834-1.036-1.515-1.22-.192-.052-.212-.054-.957-.058-.601-.005-.797 0-.926.024z"></path>
            </g>
            <defs>
              <clipPath id="clip0_2_537">
                <path fill="#fff" d="M0 0H47.769V18H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          style={{
            fontSize: "12px",
          }}
          className="flex flex-col space-y-5 pt-10 font-book font-extrabold tracking-wide text-black dark:text-white"
        >
          <div className="">MY LIST</div>
          <div className="">VISITED</div>
          <div className="">TO VISIT</div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 flex-grow p-8">
        <div className="flex justify-between items-center h-10">
          <div
            className="text-black dark:text-white font-bold font-roman tracking-wide"
            style={{
              fontSize: "20px",
            }}
          >
            MY LIST
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <div
                className="text-black dark:text-white font-bold font-roman mr-2.5"
                style={{
                  fontSize: "14px",
                }}
              >
                {!enabled ? "LIGHT MODE" : "DARK MODE"}
              </div>
              <Switch
                checked={enabled}
                onChange={() => {
                  setEnabled(!enabled);
                  setTheme(!enabled ? "light" : "dark");
                }}
              >
                <span
                  className="block bg-white rounded-full border border-black dark:border-white h-4 w-8"
                  style={{
                    padding: "2px",
                  }}
                >
                  <span
                    className={`block h-full w-1/2 rounded transition duration-300 ease-in-out transform ${
                      enabled
                        ? "bg-black rounded-full translate-x-full"
                        : "bg-black rounded-full"
                    }`}
                  ></span>
                </span>
              </Switch>
            </div>
            <div className="bg-gray-300 dark:bg-gray-100 h-8 w-8 rounded-full ml-11">
              <svg
                className="mx-auto my-2"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.83332 1.49999C7.83332 1.03975 7.46023 0.666656 6.99999 0.666656C6.53975 0.666656 6.16666 1.03975 6.16666 1.49999V2.12499H5.70214C3.84792 2.12499 2.31325 3.56667 2.1975 5.41728L2.01333 8.36182C1.94312 9.48449 1.56621 10.5664 0.92366 11.4896C0.343091 12.3239 0.859942 13.476 1.86905 13.5971L4.70832 13.9378V14.8333C4.70832 16.099 5.73434 17.125 6.99999 17.125C8.26564 17.125 9.29166 16.099 9.29166 14.8333V13.9378L12.1309 13.5971C13.14 13.476 13.6569 12.3239 13.0763 11.4896C12.4338 10.5664 12.0569 9.48449 11.9866 8.36182L11.8025 5.41728C11.6867 3.56667 10.1521 2.12499 8.29783 2.12499H7.83332V1.49999ZM5.70214 3.37499C4.50797 3.37499 3.51961 4.30347 3.44507 5.49531L3.2609 8.43985C3.1764 9.7908 2.72286 11.0927 1.94965 12.2037C1.90769 12.264 1.94504 12.3472 2.01798 12.356L5.1327 12.7298C6.37311 12.8786 7.62687 12.8786 8.86727 12.7298L11.982 12.356C12.0549 12.3472 12.0923 12.264 12.0503 12.2037C11.2771 11.0927 10.8236 9.7908 10.7391 8.43985L10.5549 5.49531C10.4804 4.30347 9.492 3.37499 8.29783 3.37499H5.70214ZM6.99999 15.875C6.42469 15.875 5.95832 15.4086 5.95832 14.8333V14.2083H8.04166V14.8333C8.04166 15.4086 7.57529 15.875 6.99999 15.875Z"
                  fill="#212121"
                />
              </svg>
            </div>
            <div className="flex items-center pl-11">
              <div className="text-black dark:text-white font-bold font-roman">
                <p className="text-gray-400 dark:text-gray-200 inline">Hey,</p>{" "}
                Jane
              </div>
              <div className="h-10 w-10 border-2 border-black dark:border-gray-400 rounded-full relative ml-5">
                <Image
                  src="/jpg/user_photo.jpg"
                  alt="Picture of the user"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
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
        <div className="">
          <Cards loading={loading} countries={countries} />
        </div>
      </div>
    </div>
  );
};

export default Home;
