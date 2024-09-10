import { RouteObject } from "react-router-dom";
import SignIn from "../../pages/auth/SignInPage";

export const SignInRouter: RouteObject[] = [
  {
    path: "/auth/signIn",
    element: <SignIn />,
  },
];
