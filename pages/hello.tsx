import { TOSINGLE, TOLIST } from "../src/contexts/constants";
import { useStore } from "../src/contexts/hooks";

export enum ListViewSteps {
  LIST,
  SINGLE,
}

export default function App() {
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
  console.log(state, "-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  return (
    <>
      {state === ListViewSteps.LIST && <div>THIS ID LIST</div>}
      {state === ListViewSteps.SINGLE && <div>THIS ID SINGLE</div>}

      <button onClick={toList} className="bg-red-500 h-5 w-36">
        CLICK HERE
      </button>
      <button onClick={toSingle} className="bg-green-500 h-5 w-36">
        BACK
      </button>
    </>
  );
}
