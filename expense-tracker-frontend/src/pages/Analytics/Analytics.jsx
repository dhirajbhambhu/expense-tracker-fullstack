import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Analytics() {

  const [analytics, setAnalytics] = useState({
    totalExpense: 0,
    highestExpense: 0,
    averageExpense: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

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

      toast.error("Failed to load analytics");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white shadow-xl rounded-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-8">
            Expense Analytics
          </h1>

          {loading ? (

            <div className="text-center text-2xl font-semibold text-gray-500 py-20">
              Loading Analytics...
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-all duration-300">

                <h2 className="text-lg font-semibold">
                  Total Expense
                </h2>

                <p className="text-4xl font-bold mt-4">
                  ₹ {analytics.totalExpense}
                </p>

              </div>

              <div className="bg-red-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-all duration-300">

                <h2 className="text-lg font-semibold">
                  Highest Expense
                </h2>

                <p className="text-4xl font-bold mt-4">
                  ₹ {analytics.highestExpense}
                </p>

              </div>

              <div className="bg-green-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-all duration-300">

                <h2 className="text-lg font-semibold">
                  Average Expense
                </h2>

                <p className="text-4xl font-bold mt-4">
                  ₹ {analytics.averageExpense}
                </p>

              </div>

              <div className="bg-purple-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-all duration-300">

                <h2 className="text-lg font-semibold">
                  Total Transactions
                </h2>

                <p className="text-4xl font-bold mt-4">
                  {analytics.totalTransactions}
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Analytics;