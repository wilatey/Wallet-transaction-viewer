import { useEffect, useState } from "react";
import { format, isAfter } from "date-fns";
import { DollarSign, Plus, Trash2, X } from "lucide-react";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    startDate: "",
    endDate: "",
  });

  // Sample transactions for calculating spent amount
  const sampleTransactions = [
    { description: "Netflix Subscription", amount: -120.5, date: new Date() },
    { description: "Grocery Shopping", amount: -200.0, date: new Date() },
    { description: "Coffee Shop", amount: -45.0, date: new Date() },
    { description: "Dinner Out", amount: -75.0, date: new Date() },
    // Add more as needed
  ];

  const categoryMap = {
    "Netflix Subscription": "Entertainment",
    "Grocery Shopping": "Groceries",
    "Coffee Shop": "Dining",
    "Dinner Out": "Dining",
  };

  useEffect(() => {
    // Load sample budgets
    const sampleBudgets = [
      {
        id: "bg1",
        category: "Entertainment",
        limit: 200,
        startDate: new Date(2025, 11, 1), // Dec 1, 2025
        endDate: new Date(2025, 11, 31), // Dec 31, 2025
      },
      {
        id: "bg2",
        category: "Groceries",
        limit: 600,
        startDate: new Date(2025, 11, 1),
        endDate: new Date(2025, 11, 31),
      },
      {
        id: "bg3",
        category: "Dining",
        limit: 300,
        startDate: new Date(2025, 11, 1),
        endDate: new Date(2025, 11, 31),
      },
    ];
    setBudgets(sampleBudgets);
  }, []);

  const calculateSpent = (category, startDate, endDate) => {
    return sampleTransactions
      .filter((tx) => {
        const txDate = tx.date;
        const matchesCategory = categoryMap[tx.description] === category;
        const withinPeriod = txDate >= startDate && txDate <= endDate;
        return tx.amount < 0 && matchesCategory && withinPeriod;
      })
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.limit ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (parseFloat(formData.limit) <= 0) {
      alert("Budget limit must be greater than 0.");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    const newBudget = {
      id: `bg${Date.now()}`,
      category: formData.category.trim(),
      limit: parseFloat(formData.limit),
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    };

    setBudgets((prev) => [...prev, newBudget]);

    // Reset form
    setFormData({
      category: "",
      limit: "",
      startDate: "",
      endDate: "",
    });
    setShowForm(false);
  };

  const removeBudget = (id) => {
    setBudgets((prev) => prev.filter((bg) => bg.id !== id));
  };

  // Filter active budgets: not expired and not exceeded
  const activeBudgets = budgets.filter((bg) => {
    const now = new Date();
    const isExpired = isAfter(now, bg.endDate);
    const spent = calculateSpent(bg.category, bg.startDate, bg.endDate);
    const isExceeded = spent >= bg.limit;
    return !isExpired && !isExceeded;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Budgets</h1>
          <p className="text-gray-600 mt-2">
            Plan and track spending limits for different categories
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-sm transition"
        >
          <Plus size={20} />
          Create Budget
        </button>
      </div>

      {/* Create Budget Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">
                New Budget Plan
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Entertainment, Groceries, Dining"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="limit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Budget Limit ($)
                </label>
                <input
                  type="number"
                  id="limit"
                  name="limit"
                  min="0"
                  step="0.01"
                  value={formData.limit}
                  onChange={handleChange}
                  placeholder="200.00"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm"
                >
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Budgets List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Active Budgets
          </h2>

          {activeBudgets.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No active budgets yet. Create one to start tracking!
            </p>
          ) : (
            <div className="space-y-5">
              {activeBudgets.map((bg) => {
                const spent = calculateSpent(
                  bg.category,
                  bg.startDate,
                  bg.endDate
                );
                const remaining = bg.limit - spent;
                const progress = (spent / bg.limit) * 100;

                return (
                  <div
                    key={bg.id}
                    className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {bg.category}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {format(bg.startDate, "MMM d, yyyy")} –{" "}
                          {format(bg.endDate, "MMM d, yyyy")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeBudget(bg.id)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-gray-600" />
                        <span className="font-medium">
                          ${spent.toFixed(2)} spent of ${bg.limit.toFixed(2)}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          remaining >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ${remaining.toFixed(2)} left
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress > 90
                            ? "bg-red-500"
                            : progress > 70
                            ? "bg-yellow-500"
                            : "bg-blue-600"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Budgets;
