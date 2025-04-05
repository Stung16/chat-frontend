import { i18n, TFunction } from "i18next";
import { createContext } from "react";
import { defaultLanguage, languages } from "@/i18n/index.ts";
import { LanguageContextType } from "@/type/hook.interface";

const defaultValue: LanguageContextType = {
  t: (() => "") as TFunction,
  i18n: {} as i18n,
  setLanguage: () => {},
  languages,
  lang: defaultLanguage,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export default LanguageContext;
