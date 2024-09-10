import { RouteObject } from "react-router-dom";
import RegisterPage from "../../pages/auth/RegisterPage";

export const RegisterRouter: RouteObject[] = [
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
];
