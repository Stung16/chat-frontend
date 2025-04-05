import { LoadingContextType } from "@/type/hook.interface";
import { createContext } from "react";

const defaultValue: LoadingContextType = {
  loading: false,
  setLoading: () => {},
};
const LoadingContext = createContext<LoadingContextType>(defaultValue);

export default LoadingContext;
