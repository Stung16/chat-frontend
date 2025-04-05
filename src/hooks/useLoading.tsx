import LoadingContext from "@/contexts/Loaing/Loading.context";
import { useContext } from "react";

const useLoading = () => useContext(LoadingContext);
export default useLoading;
