import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
} from "web3modal-web3js/react";
import { Outlet, useNavigate, Link } from "react-router";
import TransactionListener from "../components/TransactionListener";
import {
  GrBundle,
  GrCreditCard,
  GrDashboard,
  GrTransaction,
} from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { LuChartPie } from "react-icons/lu";
import { BiDockTop } from "react-icons/bi";

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
  const { isConnected, account } = useWeb3ModalAccount();

  const handleConnect = async () => {
    if (isConnected) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-6">
      <aside className="general-menu md:col-span-1 border-r-1 border-r-gray-200">
        <h1 className="icontitle">
          LTRansact
          <BiDockTop onClick={() => {}} className="ml-10" size={24} />
        </h1>
        <p className="text-sm text-neutral-400/50">GENERAL MENU</p>
        <nav className="nav mt-4 text-gray-500">
          <ul>
            <li>
              <GrDashboard className="inline-block mr-2 mt-1" />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <GrCreditCard className="inline-block mr-2 mt-1" />
              <Link to="/accounts">Accounts</Link>
            </li>
            <li>
              <GrTransaction className="inline-block mr-2 mt-1" />
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <TbMoneybag className="inline-block mr-2 mt-1" />
              <Link to="/budgets">Budgets</Link>
            </li>
            <li>
              <LuChartPie className="inline-block mr-2 mt-1" />
              <Link to="/report">Report</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="md:col-span-5  bg-white">
        <Outlet />
      </main>
      <TransactionListener walletAddress={account?.address} />
    </div>
  );
}
export default App;
