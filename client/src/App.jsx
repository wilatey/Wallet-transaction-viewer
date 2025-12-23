import { useEffect } from "react";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "web3modal-web3js/react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import TransactionListener from "../components/TransactionListener";
import Header from "../components/Header"; // Fixed: Imported Header
import { GrCreditCard, GrDashboard, GrTransaction } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { LuChartPie } from "react-icons/lu";
import { BiDockTop } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const projectId = import.meta.env.VITE_PROJECT_ID;

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://mainnet.infura.io/v3/d2bef4559f634a1e87e6c99a3c155606",
};

const metadata = {
  name: "E-Wallet Transaction Viewer",
  description: "A web application for viewing wallet transactions",
  url: "https://jocular-bunny-536eb2.netlify.app/",
  icons: [""],
};

const web3Config = defaultConfig({
  metadata,

  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "https://mainnet.infura.io/v3/d2bef4559f634a1e87e6c99a3c155606",
  defaultChainId: 1,
});

createWeb3Modal({
  web3Config,
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
});

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, account } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (isConnected && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isConnected, navigate, location.pathname]);

  // if (!isConnected) {
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center bg-gray-50 overflow-hidden relative">
  //       {/* Decorative Background Elements */}
  //       <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
  //       <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-400/30 rounded-full blur-3xl" />

  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="z-10 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 text-center max-w-md w-full"
  //       >
  //         <div className="mb-6 flex justify-center">
  //           <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
  //             <BiDockTop className="text-white text-4xl" />
  //           </div>
  //         </div>
  //         <h1 className="text-3xl font-bold text-gray-800 mb-2">LTRansact</h1>
  //         <p className="text-gray-500 mb-8">
  //           Securely manage your assets and track transactions in real-time.
  //         </p>

  //         <button
  //           onClick={() => open()}
  //           className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
  //         >
  //           Connect Wallet
  //         </button>
  //       </motion.div>
  //     </div>
  //   );
  // }

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

        {/* Restored Sidebar Navigation */}
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

      {account?.address && (
        <TransactionListener walletAddress={account.address} />
      )}
    </div>
  );
}

export default App;
