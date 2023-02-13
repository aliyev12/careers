import { useEffect, useState } from "react";

export function useMatchMedia() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (
      window &&
      typeof window !== undefined &&
      typeof window !== "undefined"
    ) {
      const mediaWatcher = window.matchMedia("(min-width: 768px)");
      setIsDesktop(mediaWatcher.matches);

      mediaWatcher.addEventListener("change", updateIsNarrowScreen);

      return function cleanup() {
        mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
      };
    }
  }, []);

  function updateIsNarrowScreen(e: any) {
    setIsDesktop(e.matches);
  }

  return { isDesktop };
}
