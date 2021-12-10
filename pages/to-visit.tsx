import { Fragment, useState, useEffect } from "react";
import DashboardLayout from "../src/components/DashboardLayout";
import { useStore } from "../src/contexts/hooks";
import { TOSINGLE, TOLIST } from "../src/contexts/constants";
import { useSession, getSession } from "next-auth/client";
import { Sessions, FormSearch } from "../src/types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { InputSearch } from "../src/components/commons/InputSearch";
import { Validations } from "../src/components/utils/formValidation";
import Cards from "../src/components/cards/index";
import SingleCountry from "../src/components/SingleCountry";

export enum ListViewSteps {
  LIST,
  SINGLE,
}

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

const ToVisit = (props: Sessions) => {
  const [state, dispatch] = useStore();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [countries, setCountry] = useState<any>([]);
  const [myList, setList] = useState<any>([]);
  const [cca2list, setCca2list] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [selected, setSelected] = useState();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<FormSearch>();

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

  const listData = async () => {
    const myList = await fetch(`/api/list?type=tovisit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const myListdata = await myList.json();

    return myListdata;
  };

  useEffect(() => {
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
  return (
    <DashboardLayout
      state={state}
      toSingle={toSingle}
      toList={toList}
      session={props}
      title={"TO VISIT"}
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
  );
};

export default ToVisit;

// localhost:3000/api/list?type=tovisit
