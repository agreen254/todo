import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newState: T) => void] {
  let stateVal: T = initialValue;

  // because next has server-side rendering, this code is run on the client and server
  // for the server, the window object is undefined
  // without this check, you will get a hydration error
  // can alternatively wrap it in a useEffect hook, which is only run on the client
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
