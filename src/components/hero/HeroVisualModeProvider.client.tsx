"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type HeroVisualMode = "image" | "video";

type HeroVisualModeContextValue = {
  mode: HeroVisualMode;
  setMode: (mode: HeroVisualMode) => void;
  toggleMode: () => void;
};

const HeroVisualModeContext = createContext<HeroVisualModeContextValue | null>(null);

type ProviderProps = Readonly<{
  children: ReactNode;
}>;

export function HeroVisualModeProvider({ children }: ProviderProps) {
  const [mode, setMode] = useState<HeroVisualMode>("image");

  const toggleMode = useCallback(() => {
    setMode((current) => (current === "image" ? "video" : "image"));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, toggleMode],
  );

  return (
    <HeroVisualModeContext.Provider value={value}>{children}</HeroVisualModeContext.Provider>
  );
}

export function useHeroVisualMode(): HeroVisualModeContextValue {
  const context = useContext(HeroVisualModeContext);
  if (!context) {
    throw new Error("useHeroVisualMode must be used within HeroVisualModeProvider");
  }
  return context;
}

export function useHeroVisualModeOptional(): HeroVisualModeContextValue | null {
  return useContext(HeroVisualModeContext);
}
