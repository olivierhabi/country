import { Fragment, useState, useEffect } from "react";
import DashboardLayout from "../src/components/DashboardLayout";
import { useStore } from "../src/contexts/hooks";
import { TOSINGLE, TOLIST } from "../src/contexts/constants";

const ToVisit = () => {
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
      title={"TO VISIT"}
    >
      ToVisit
    </DashboardLayout>
  );
};

export default ToVisit;
