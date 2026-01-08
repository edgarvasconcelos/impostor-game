import { useEffect, useState } from "react";
import { initialGameState } from "../context/initialGameState";

/**
 * Hook genérico para estado persistido
 */
export function usePersistentGame<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return initialValue;

      const parsed = JSON.parse(stored);

      return {
        ...initialValue,
        ...parsed,
      };
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
