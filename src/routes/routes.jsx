import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Main from "../layout/Main";
import Login from "../components/Login";
import AdminMain from "../layout/AdminMain";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import Users from "../components/Users";
import CreateUser from "../components/CreateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminMain />
          </PrivateRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "users",
            element: (
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            ),
          },
          {
            path: "users/create",
            element: (
              <PrivateRoute>
                <CreateUser />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
