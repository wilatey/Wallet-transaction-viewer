// Fixed main.jsx
import ReactDOM from "react-dom/client";
import { lazy, Suspense, StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import App from "./App";
import "./index.css";
import TransactionDetail from "../components/TransactionDetail";
import Login from "../components/Login";

const Dashboard = lazy(() => import("../components/Dashboard"));
const Accounts = lazy(() => import("../components/Accounts"));
const Transaction = lazy(() => import("../components/Transaction"));
const Budgets = lazy(() => import("../components/Budgets"));
const Report = lazy(() => import("../components/Report"));

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
