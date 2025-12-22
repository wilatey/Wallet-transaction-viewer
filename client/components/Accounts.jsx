import {
  Bitcoin,
  ChevronRight,
  Copy,
  DollarSign,
  Globe,
  Plus,
  QrCode,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useWeb3ModalAccount } from "web3modal-web3js/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
function Accounts() {
  const { account, isConnected } = useWeb3ModalAccount();

  const accounts = [
    {
      id: 1,
      name: "Main Account",
      address: account?.address || "N/A",
      balanceUSD: 5034.32,
      balanceETH: 18.45,
      chain: "Ethereum Mainnet",
      assets: [
        { symbol: "USD", amount: 12000, used: 2000 },
        { symbol: "ETH", amount: 500, used: 200 },
      ],
    },
    {
      id: 2,
      name: "Saving Account",
      address: "N/A",
      balanceUSD: 12345.0,
      balanceETH: 320.24,
      chain: "Polygon",
      assets: [
        { symbol: "MATIC", amount: 8500, used: 9350 },
        { symbol: "USDC", amount: 3000, used: 3000 },
      ],
    },
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balanceUSD, 0);

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  const notify = () => {
    toast("Copy Successfully!", {
      position: "bottom-right",
      autoClose: 10,
      closeOnClick: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-600">My Accounts</h1>
        <p className="text-gray-600 mt-2">
          Manage your wallets and view balance across chains
        </p>
      </div>

      {/* Total Portfolio Balance */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
        <p className="text-gray-600 text-lg">Total Portfolio Balance</p>
        <p className="text-5xl font-bold mt-4">
          ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-green-600 mt-4 flex items-center justify-center gap-2">
          <TrendingUp size={32} />
          +12.5% this month
        </p>
      </div>

      {/* Accounts List */}
      <div className="space-y-6 h-full w-full">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Wallet size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{acc.name}</h3>
                    <p className="text-sm test-gray-500 flex items-center gap-2">
                      <Globe size={16} />
                      {acc.chain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyAddress(acc.address)}
                    className="acc_button_setting"
                  >
                    <Copy size={20} onClick={notify} />
                    <ToastContainer autoClose={true} />
                  </button>
                  <button className="acc_button_setting">
                    <QrCode size={20} />
                  </button>
                  <ChevronRight
                    size={24}
                    className="text-gray-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="">
                  <p className="text-3xl font-bold">
                    ${acc.balanceUSD.toLocaleString()}
                  </p>
                  <p className="text-start text-gray-600">
                    ${acc.balanceETH}{" "}
                    {acc.chain.includes("Ethereum") ? "ETH" : "MATIC"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500"> Address </p>
                  <p className="font-mono text-sm"> {acc.address}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/50">
              <div className="flex items-center justify-baseline mb-3">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Top Assets
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acc.assets.map((assets) => (
                  <div
                    key={assets.symbol}
                    className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          assets.symbol === "ETH"
                            ? "bg-indigo-50 text-indigo-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {assets.symbol === "ETH" ? (
                          <Bitcoin size={20} />
                        ) : (
                          <DollarSign size={20} />
                        )}
                      </div>
                      <span className="font-bold text-gray-700">
                        {assets.symbol}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-bold text-gray-900 text-sm">
                        {assets.amount}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        ${assets.used.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg">
          <Plus size={24} />
          Add New Account / Import Wallet
        </button>
      </div>
    </div>
  );
}
export default Accounts;
