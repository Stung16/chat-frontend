import LoadingContext from "@/contexts/Loaing/Loading.context";
import { ProviderProps } from "@/type/hook.interface";
import { useState } from "react";

const LoadingProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
