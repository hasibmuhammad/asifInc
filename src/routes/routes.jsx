import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Main from "../layout/Main";
import Login from "../components/Login";
import AdminMain from "../layout/AdminMain";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import Employees from "../components/Employees";
import CreateUser from "../components/CreateUser";
import EmployeeDetail from "../components/EmployeeDetail";

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
            path: "employees",
            element: (
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            ),
          },
          {
            path: "employees/:id",
            element: (
              <PrivateRoute>
                <EmployeeDetail />
              </PrivateRoute>
            ),
          },
          {
            path: "employees/create",
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
