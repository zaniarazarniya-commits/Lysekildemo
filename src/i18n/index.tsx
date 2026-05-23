import React, { createContext, useContext, useState } from "react";
import { sv } from "./sv";
import { en } from "./en";
import type { Strings } from "./sv";

type Language = "sv" | "en";

const STRINGS: Record<Language, Strings> = { sv, en };

interface I18nContextType {
  t: Strings;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType>({
  t: sv,
  language: "sv",
  setLanguage: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("sv");
  return (
    <I18nContext.Provider value={{ t: STRINGS[language], language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
