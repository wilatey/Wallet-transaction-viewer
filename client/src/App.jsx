import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
} from "web3modal-web3js/react";
import { Outlet, useNavigate, Link } from "react-router";
import TransactionListener from "../components/TransactionListener";

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
    } else {
      try {
        await modal.open();
      } catch (error) {
        console.error("Error opening modal:", error);
      }
    }
  };

  return (
    <div>
      <header>
        <h1 className="icontitle">LTRansact</h1>
        <button onClick={handleConnect}>
          {isConnected ? "Go to Dashboard" : "Connect Wallet"}
        </button>

        <nav className="nav">
          <ul>
            <li>GENERAL MENU</li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/accounts">Accounts</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/budgets">Budgets</Link>
            </li>
            <li>
              <Link to="/report">Report</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <TransactionListener walletAddress={account?.address} />
    </div>
  );
}
export default App;
