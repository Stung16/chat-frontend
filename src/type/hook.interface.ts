import { ReactNode } from "react";
import { languages } from "@/i18n";
import { i18n, type TFunction } from "i18next";

interface Location {
  hash: string;
  pathname: string;
  search: string;
}

export default interface DefaultProps {
  location: Location;
  lang: string;
  searchParams: Record<string, string | undefined>;
  params: Record<string, string | undefined>;
  // eslint-disable-next-line no-unused-vars
  notFound: (error: string) => void;
}

export type ProviderProps = {
  children: ReactNode;
};

export type LanguageContextType = {
  t: TFunction<"translation">;
  i18n: i18n;
  // eslint-disable-next-line no-unused-vars
  setLanguage: (lang: string) => void;
  languages: typeof languages;
  lang: keyof typeof languages;
};
export type LoadingContextType = {
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  setLoading: (loading: boolean) => void;
};
