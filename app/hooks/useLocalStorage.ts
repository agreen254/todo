import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newState: T) => void] {
  let stateVal: T = initialValue;
  if (typeof window !== "undefined") {
    const valFromStorage = window.localStorage.getItem(key);
    if (valFromStorage) {
      stateVal = JSON.parse(valFromStorage);
    }
  }

  const [state, setState] = useState(stateVal);

  const updateState = (value: T): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, updateState];
}

export default useLocalStorage;
