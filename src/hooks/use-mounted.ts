import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after client-side hydration. Avoids the classic
 * `useEffect(() => setMounted(true), [])` pattern, which triggers React's
 * "no setState during render-adjacent effects" purity lint — useSyncExternalStore
 * is the sanctioned way to read a value that legitimately differs between
 * server and client snapshots (theme, locale, etc).
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
