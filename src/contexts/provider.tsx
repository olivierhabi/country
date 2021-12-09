import { createContext, useReducer } from "react";
import { TOSINGLE, TOLIST } from "./constants";

export enum ListViewSteps {
  LIST,
  SINGLE,
}
export interface ActionType {
  type: string;
}

export const Context = createContext<any>(ListViewSteps.LIST);
export const { Consumer, Provider } = Context;

function reducer(state: number, action: ActionType) {
  switch (action.type) {
    case TOLIST:
      return ListViewSteps.LIST;
    case TOSINGLE:
      return ListViewSteps.SINGLE;
    default:
      throw new Error();
  }
}

export default function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, ListViewSteps.SINGLE);
  return <Provider value={[state, dispatch]}>{props.children}</Provider>;
}
