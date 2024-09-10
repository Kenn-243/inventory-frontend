import { SignInRouter } from "./auth/SignInRouter";
import App from "../pages/App";
import { HomeRouter } from "./home/HomeRouter";
import { RouteObject } from "react-router-dom";
import { RegisterRouter } from "./auth/RegisterRouter";

export const CombinedRouter: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [...RegisterRouter, ...SignInRouter, ...HomeRouter],
  },
];
