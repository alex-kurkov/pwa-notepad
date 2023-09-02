import { useEffect } from 'react';
import { useTimeout } from './useTimeout';

export function useDebounce(
  callback: () => unknown,
  delay: number,
  deps: unknown[]
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [reset, ...deps]);
  useEffect(clear, [clear]);
}
