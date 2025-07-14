import {useState, useEffect} from 'react';

/**
 * A hook that returns a debounced version of the input value.
 *
 * @param value - The value to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @returns - The debounced value.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to the provided value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value or the delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
