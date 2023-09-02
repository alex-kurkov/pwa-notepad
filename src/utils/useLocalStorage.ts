import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function getLocalStorageValue<P>(key: string, initialValue: P ) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    return JSON.parse(savedValue);
  }
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
}

export function useLocaStorage<P>(
  key: string,
  init: P
): [P, Dispatch<SetStateAction<P>>] {
  const [value, setValue] = useState<P>(() => getLocalStorageValue(key, init));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
