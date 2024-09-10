import { RouteObject } from "react-router-dom";
import Home from "../../pages/home/HomePage";

export const HomeRouter: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];
