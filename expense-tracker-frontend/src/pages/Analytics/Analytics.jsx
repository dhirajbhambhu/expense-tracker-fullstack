import { useEffect, useState } from "react";
import api from "../../services/api";

function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalExpense: 0,
    highestExpense: 0,
    averageExpense: 0,
    totalTransactions: 0,
  });

  async function fetchAnalytics() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalytics(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert("Failed to load analytics");
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[700px]">

        <h1 className="text-4xl font-bold text-center mb-8">
          Expense Analytics
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-blue-500 text-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold">
              Total Expense
            </h2>

            <p className="text-3xl font-bold mt-3">
              ₹{analytics.totalExpense}
            </p>
          </div>

          <div className="bg-red-500 text-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold">
              Highest Expense
            </h2>

            <p className="text-3xl font-bold mt-3">
              ₹{analytics.highestExpense}
            </p>
          </div>

          <div className="bg-green-500 text-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold">
              Average Expense
            </h2>

            <p className="text-3xl font-bold mt-3">
              ₹{analytics.averageExpense}
            </p>
          </div>

          <div className="bg-purple-500 text-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold">
              Total Transactions
            </h2>

            <p className="text-3xl font-bold mt-3">
              {analytics.totalTransactions}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Analytics;