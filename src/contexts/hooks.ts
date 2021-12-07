import { useContext } from 'react';
import { Context } from './provider';

export function useStore() {
  return useContext(Context);
}
