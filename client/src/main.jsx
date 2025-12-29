// Fixed main.jsx
import ReactDOM from "react-dom/client";
import { lazy, Suspense, StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import App from "./App";
import "./index.css";
import TransactionDetail from "../components/BackendPage/TransactionDetail";
import Login from "../components/FrontPage/Login";
import Register from "../components/FrontPage/Register";

const Dashboard = lazy(() => import("../components/BackendPage/Dashboard"));
const Accounts = lazy(() => import("../components/BackendPage/Accounts"));
const Transaction = lazy(() => import("../components/BackendPage/Transaction"));
const Budgets = lazy(() => import("../components/BackendPage/Budgets"));
const Report = lazy(() => import("../components/BackendPage/Report"));
const Profile = lazy(() => import("../components/FrontPage/Profile"));
const Setting = lazy(() => import("../components/FrontPage/Setting"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense
            fallback={
              <div className="p-8 text-center">Loading dashboard...</div>
            }
          >
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading Profile...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<div>Loading Settings...</div>}>
            <Setting />
          </Suspense>
        ),
      },
      {
        path: "accounts",
        element: (
          <Suspense
            fallback={
              <div className="p-8 text-center">Loading Accounts...</div>
            }
          >
            <Accounts />
          </Suspense>
        ),
      },
      {
        path: "transactions",
        element: (
          <Suspense
            fallback={
              <div className="p-8 text-center">Loading Transactions...</div>
            }
          >
            <Transaction />
          </Suspense>
        ),
        children: [
          {
            path: ":transactionId",
            element: <TransactionDetail />,
          },
        ],
      },
      {
        path: "budgets",
        element: (
          <Suspense
            fallback={<div className="p-8 text-center">Loading Budgets...</div>}
          >
            <Budgets />
          </Suspense>
        ),
      },
      {
        path: "report",
        element: (
          <Suspense
            fallback={<div className="p-8 text-center">Loading Report...</div>}
          >
            <Report />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
