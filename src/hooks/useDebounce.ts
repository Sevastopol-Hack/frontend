import { useState } from "react";

export const useDebounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
) => {
  const [timer, setTimer] = useState(0);

  const debounced = (...args: any) => {
    clearTimeout(timer);
    setTimer(setTimeout(() => func(...args), waitFor) as any);
  };

  return debounced as (...args: Parameters<F>) => void;
};
