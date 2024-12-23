import { useState, useEffect } from "react";

export const useStateWithLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  const setStateWithPersistence = (state) => {
    localStorage.setItem(key, JSON.stringify(state));
    setState(state);
  };

  useEffect(() => {
    const loadedStateJson = localStorage.getItem(key);
    if (loadedStateJson) {
      setState(JSON.parse(loadedStateJson));
    }
  }, []);

  return [state, setStateWithPersistence];
};
