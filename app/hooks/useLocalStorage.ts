import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newState: T) => void] {
  const valFromStorage = window.localStorage.getItem(key);
  const stateVal = valFromStorage ? JSON.parse(valFromStorage) : initialValue;
  const [state, setState] = useState(stateVal);

  const updateState = (value: T): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, updateState];
}

export default useLocalStorage;
