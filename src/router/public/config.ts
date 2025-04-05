import Home from "@/App/pages/home/Home";
import { RoutesMapInterface } from "@/router/interface/routesMap.interface";

const publicRoutesMap: RoutesMapInterface[] = [
  {
    link: "/",
    title: "nav.HOME",
    Element: Home,
  },
];
export default publicRoutesMap;
