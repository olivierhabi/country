import Image from "next/image";
import formatPopulation from "../helpers/formatPopulation";
import { useStore } from "../contexts/hooks";
import { TOSINGLE, TOLIST } from "../contexts/constants";
import { useRouter } from "next/router";

export enum ListViewSteps {
  LIST,
  SINGLE,
}

const SingleCountry = ({ selected }: any): JSX.Element | null => {
  const router = useRouter();
  const [state, dispatch] = useStore();

  function toList() {
    dispatch({
      type: TOLIST,
    });
  }

  if (!selected) {
    toList();
    router.push(router.route);
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="w-full mt-[60px] mb-7 px-8 md:hidden">
        <button
          onClick={toList}
          className="text-black px-[44px] py-[12px] text-[20px] bg-white dark:bg-gray-600 drop-shadow-lg dark:text-white font-bold font-roman tracking-wide flex items-center"
        >
          <svg
            className="inline text-black dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            fill="none"
            viewBox="0 0 18 14"
            stroke="currentColor"
          >
            <path
              fill="#000"
              d="M7.707 2.374A1 1 0 006.293.96L.96 6.293a.997.997 0 000 1.414l5.333 5.333a1 1 0 101.414-1.414L4.081 8H17a1 1 0 100-2H4.08l3.627-3.626z"
            ></path>
          </svg>
          <p className="inline pl-4">BACK</p>
        </button>
      </div>
      <div className="pb-[50px] flex flex-col justify-center items-center mt-[90px] mx-11">
        <div className="flex flex-wrap flex-col lg:flex-row items-center lg:items-start w-full">
          <div className="bg-red-500 w-[550px] lg:w-[35%] lg:mr-[10%] min-w-[450px] h-[350px] lg:h-[300px] relative lg:mt-[40px]">
            <Image
              src={selected.flags.png}
              alt="Picture of the flag"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-[550px] lg:w-max pt-16 lg:pt-[50px]">
            <div className="w-full flex flex-col space-y-10 justify-between">
              <div className="h-full">
                <div className="font-roman text-[30px] font-bold">
                  {selected.name.common}
                </div>
                <div className="mt-3 flex flex-wrap flex-col lg:space-x-[30px] lg:flex-row">
                  <div className="text-[18px] flex flex-col space-y-[14px]">
                    <div className="">
                      <div className="font-roman inline font-bold">
                        Native Name:
                      </div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {
                          selected.name.nativeName[
                            Object.keys(selected.name.nativeName)[0]
                          ].common
                        }
                      </div>
                    </div>
                    <div className="">
                      <div className="font-roman inline font-bold">
                        Population:
                      </div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {formatPopulation(selected.population)}
                      </div>
                    </div>
                    <div className="">
                      <div className="font-roman inline font-bold">Region:</div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {selected.region}
                      </div>
                    </div>
                    <div className="">
                      <div className="font-roman inline font-bold">
                        Sub Region:
                      </div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {selected.subregion}
                      </div>
                    </div>
                    <div className="">
                      <div className="font-roman inline font-bold">
                        Capital:
                      </div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {selected.capital}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col space-y-[14px] lg:mt-[0px] mt-[60px] lg:text-[18px] text-[22px]">
                    <div className="">
                      <div className="font-roman inline font-bold">
                        Top Level Domain:
                      </div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {selected.tld &&
                          selected.tld.map((domain: string) => {
                            return <>{domain}</>;
                          })}
                      </div>
                    </div>
                    <div className="">
                      <div className="font-roman inline font-bold">
                        Currencies:
                      </div>
                      <div className="inline pl-2 text-gray-600 dark:text-white font-roman">
                        {selected.languages &&
                          Object.keys(selected.languages).map(
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
                </div>
              </div>
              <div className="flex flex-col lg:pt-[0px] pt-10 w-full text-[22px]">
                <div className="font-roman inline text-[25px] font-bold pb-[20px]">
                  Border Countries:
                </div>
                <div className="flex flex-wrap md:flex-row items-center mx-10 lg:mx-[0px] w-[500px]">
                  {selected.borders &&
                    selected.borders.map((country: string) => {
                      return (
                        <div className=" lg:text-[14px] mr-[20px] pb-[15px]">
                          <button className="px-[50px] py-[5px] font-bold font-roman mx-auto bg-white dark:bg-gray-800 border-[3px] border-gray-300 shadow-sm hover:bg-yellow-default focus:outline-none">
                            {country}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCountry;
