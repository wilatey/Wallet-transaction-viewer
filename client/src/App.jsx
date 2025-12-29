// Fixed App.jsx (Removed WalletConnect, added state/import, cleaned up)
import { useEffect, useState } from "react"; // Added useState
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import Header from "../components/BackendPage/Header";
import Login from "../components/FrontPage/Login"; // Added import
import { GrCreditCard, GrDashboard, GrTransaction } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { LuChartPie } from "react-icons/lu";
import { BiDockTop } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Added state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (!isAuthenticated) {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return <Outlet />;
    } else {
      return <Login />;
    }
  }

  return (
    <div className="w-screen flex flex-col md:grid md:grid-cols-6 h-screen overflow-hidden">
      <aside className="general-menu md:col-span-1 border-r border-r-gray-200 h-full flex flex-col bg-white">
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BiDockTop className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            LTRansact
          </h1>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto mt-4">
          <ul className="space-y-2">
            {[
              { path: "/dashboard", icon: GrDashboard, label: "Dashboard" },
              { path: "/accounts", icon: GrCreditCard, label: "Accounts" },
              {
                path: "/transactions",
                icon: GrTransaction,
                label: "Transactions",
              },
              { path: "/budgets", icon: TbMoneybag, label: "Budgets" },
              { path: "/report", icon: LuChartPie, label: "Report" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="md:col-span-5 bg-white flex flex-col h-full overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
