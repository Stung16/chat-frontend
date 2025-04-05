import LanguageContext from "@/contexts/Translation/Translation.context";
import { useContext } from "react";

const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
