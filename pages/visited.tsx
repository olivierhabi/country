import { Fragment, useState, useEffect } from "react";
import { useStore } from "../src/contexts/hooks";
import { TOSINGLE, TOLIST } from "../src/contexts/constants";
import DashboardLayout from "../src/components/DashboardLayout";

const Visited = () => {
  const [state, dispatch] = useStore();

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
    <DashboardLayout
      state={state}
      toSingle={toSingle}
      toList={toList}
      title={"VISITED"}
    >
      <div></div>
    </DashboardLayout>
  );
};

export default Visited;
