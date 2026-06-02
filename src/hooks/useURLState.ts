import { useSearchParams } from 'react-router-dom';

export function useURLState(key: string, defaultValue: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) || defaultValue;

  const setValue = (newValue: string) => {
    setSearchParams(
      (prev) => {
        const updated = new URLSearchParams(prev);
        updated.set(key, newValue);
        return updated;
      },
      { replace: true } // Don't build up a massive history stack for color/size clicks
    );
  };

  return [value, setValue] as const;
}
