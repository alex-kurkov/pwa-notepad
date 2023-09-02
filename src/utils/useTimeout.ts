import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(callback: () => unknown, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<null | number>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay) as unknown as number;
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();

    return () => clear();
  }, [set, clear, delay]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [set, clear])

  
  return {reset, clear};
}
