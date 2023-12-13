import { createBrowserRouter } from "react-router-dom";
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  TimeEntryScreen,
  WeeklyTimeViewScreen,
} from "../screens";
import Layout from "../layout/layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomeScreen /> },
      { path: "/register", element: <RegisterScreen /> },
      { path: "/login", element: <LoginScreen /> },
      { path: "/time-entry", element: <TimeEntryScreen /> },
      { path: "/weekly-time-view", element: <WeeklyTimeViewScreen /> },
      { path: "*", element: <div>404</div> },
    ],
  },
]);
