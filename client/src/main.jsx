import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import App from "./App";
import Dashboard from "../components/Dashboard";
import Accounts from "../components/Accounts";
import Transaction from "../components/Transaction";
import TransactionDetail from "../components/TransactionDetail";
import Budgets from "../components/Budgets";
import Report from "../components/Report";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "transactions",
        element: <Transaction />,
        children: [
          {
            path: ":transactionId",
            element: <TransactionDetail />,
          },
        ],
      },
      {
        path: "budgets",
        element: <Budgets />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
