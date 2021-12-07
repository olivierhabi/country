import Image from "next/image";
import formatPopulation from "../helpers/formatPopulation"


const SingleCountry = (props: any) => {
  console.log(props.selected.borders, "=================== PROPS");
  return (
    <div className="flex flex-row  mt-7">
      <div className="w-[50%] h-[100vh]">
        <div className="flex pt-[140px] pl-[23px]">
          <div className="w-[531px] h-[351px] bg-red-500">
            <div className="h-full relative">
              <Image
                src={props.selected.flags.png}
                alt="Picture of the user"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex mt-[170px] g-green-400">
        <div className="w-full h-[290px] flex flex-col space-y-10 justify-between">
          <div className="">
            <div className="h-[64px] font-roman text-[30px] font-bold">
              {props.selected.name.common}
            </div>
            <div className="h-[184px] flex flex-row">
              <div className="w-[50%] text-[18px] flex flex-col space-y-[7px]">
                <div className="">
                  <div className="font-roman inline font-bold">
                    Native Name:
                  </div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {
                      props.selected.name.nativeName[
                        Object.keys(props.selected.name.nativeName)[0]
                      ].common
                    }
                  </div>
                </div>
                <div className="">
                  <div className="font-roman inline font-bold">Population:</div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {formatPopulation(props.selected.population)}
                  </div>
                </div>
                <div className="">
                  <div className="font-roman inline font-bold">Region:</div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {props.selected.region}
                  </div>
                </div>
                <div className="">
                  <div className="font-roman inline font-bold">Sub Region:</div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {props.selected.subregion}
                  </div>
                </div>
                <div className="">
                  <div className="font-roman inline font-bold">Capital:</div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {props.selected.capital}
                  </div>
                </div>
              </div>
              <div className="w-[50%] text-[18px] flex flex-col space-y-[7px]">
                <div className="">
                  <div className="font-roman inline font-bold">
                    Top Level Domain:
                  </div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {props.selected.tld &&
                      props.selected.tld.map((domain: string) => {
                        return <>{domain}</>;
                      })}
                  </div>
                </div>
                <div className="">
                  <div className="font-roman inline font-bold">Currencies:</div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {props.selected.languages &&
                      Object.keys(props.selected.languages).map(
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
                <div className="">
                  <div className="font-roman inline font-bold">Languages:</div>
                  <div className="inline pl-2 text-gray-600 font-roman">
                    {props.selected.currencies &&
                      Object.values(props.selected.languages).map(
                        (language, index) => {
                          return (
                            <>
                              {index !== 0 ? "," : null}
                              {language}
                            </>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[90px] text-[16px]">
            <div className="font-roman inline font-bold">Border Countries:</div>
            <div className="text-gray-600 inline pl-[8px]">
              {props.selected.borders &&
                props.selected.borders.map((country: string) => {
                  return (
                    <button
                      disabled={true}
                      className="ml-[6px] px-[40px] py-[5px] font-bold font-roman mx-auto bg-white border-[3px] border-gray-300 shadow-sm hover:bg-yellow-default focus:outline-none"
                    >
                      {country}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCountry;
